import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './components/UserInterface/InterfaceTabs/InterfaceTabs.css';
import './components/GameInterface/GameInterface.css';
import InterfaceTabs from './components/UserInterface/InterfaceTabs/InterfaceTabs';
import Home from './components/MainPage/Home';
import CreateAccount from './components/MainPage/CreateAccount';
import Login from './components/MainPage/Login';
import GameInterface from './components/GameInterface/components/GameInterface';
import MessageLog from './components/UserInterface/InterfaceTabs/MessageLog';
import MainLayout from './components/MainPage/MainLayout';
import { determineLevel } from './components/GameInterface/utils/woodcuttingUtils';
import { LOGS } from './data/logs';
import Settings from './components/MainPage/Settings';

// TODO: erase all console.logs

// TODO: re-route login button to go to home screen, let user click "play"

function useAutoSave(userId, statsData, isLoggedIn) {
  const dataRef = useRef(statsData);
  dataRef.current = statsData;

  const save = async () => {
    if (!isLoggedIn || !userId ) return;
    try {
      await syncUserStats(userId, dataRef.current);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => { // TODO: update 5000 -> 60000
    if (!isLoggedIn) return; 
    const interval = setInterval(save, 5000); // 60 seconds
    return () => clearInterval(interval);
  }, [isLoggedIn, userId]);
  
  return { forceSave: save };
}


// TODO: figure out how to send itemnames in inventory
async function syncUserStats(userId, statsData) {

  console.log("Sending to Backend:", JSON.stringify(statsData, null, 2));

  try {
    const response = await fetch(`http://localhost:8080/api/stats/${userId}/sync`, {
      method: 'PUT', 
      headers: {
        'content-type': 'application/json', 
      },
      body: JSON.stringify(statsData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
}

function App() {

  //hooks
  const navigate = useNavigate();

  // states
  const [inventory, setInventory] = useState(Array(28).fill(null));
  const [woodcuttingExp, setWoodcuttingExp] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isChopping, setIsChopping] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expTable, setExpTable] = useState([]);
  const [stats, setStats] = useState( {userId: 1, expWoodcutting: 0, inventory: []});
  const [userId, setUserId] = useState(null);

  // refs
  const expRef = useRef(woodcuttingExp);
  const isChoppingRef = useRef(false);

  // default to level 1 while waiting for promise 
  const currentLevel = expTable.length > 0 
    ? determineLevel(woodcuttingExp, expTable)
    : 1; 

  // manage auto-save timer
  const { forceSave } = useAutoSave(stats.userId, stats, isLoggedIn);

  console.log("App State Check:", { 
  xp: stats.expWoodcutting, 
  level: stats.levelWoodcutting, 
  invCount: stats.inventory.filter(Boolean).length 
});

  // set stats when levelRequirements table promise is resolved 
  useEffect(() => {
    if (expTable.length > 0 && statusbar.expWoodcutting > 0) {
      const correctLevel = determineLevel(stats.expWoodcutting, expTable);

      setStats(prev => ({
        ...prev,
        levelWoodcutting: correctLevel
      }));
    }
  }, [expTable]);

  


  async function handleLogout() {
    await forceSave();
    navigate('/'); // home page 
  }


  async function handleLoginSuccess(sessionData) {
    try {
      // save sessionData to browser for persistence 
      localStorage.setItem('userSession', JSON.stringify(sessionData));

      const response = await fetch('http://localhost:8080/api/levels');
      const levelTable = await response.json();
      setExpTable(levelTable);

      const freshInventory = Array(28).fill(null);
      
      // assign each item to correct slot
      if (sessionData.inventory) {
        sessionData.inventory.forEach(item => {
          freshInventory[item.slotPosition] = item;
        });
      }
      // include freshInventory in new stats state
      const updatedStats = {
        ...sessionData,
        inventory: freshInventory
      };

      setInventory(freshInventory);
      setStats(updatedStats); // for back end
      setWoodcuttingExp(sessionData.expWoodcutting); // for inventory panel
      setIsLoggedIn(true);

    } catch (error) {
      console.log("failed to load game data:", error);
    }
  };

  function handleAddMessage(msg) {
    setMessages(prev => [...prev, msg]);
  }

  function handleAddToInventory(logName) {
    setStats(prevStats => {
      const newInventory = [...prevStats.inventory];

      // if inventory is full, log message
      const emptySlotIndex = newInventory.findIndex(slot => slot === null);
      if (emptySlotIndex === -1) {
        handleAddMessage("Your inventory is too full to hold any more logs.");
        handleStopGlobalChop();
        return prevStats;
      }

      // if available inventory slot, update item object 
      newInventory[emptySlotIndex] = {
        itemName: logName,
        quantity: 1,
        slotPosition: emptySlotIndex
      };

      return { ...prevStats, inventory: newInventory };
    });
  }

  function handleDropItem(index) {
    setInventory(prev => {
      const newInventory = [...prev];
      newInventory[index] = null; // clear this inventory slot
      return newInventory;
    });
  }

  // logic for state changes on successful log chop
  function handleGainExp(amount) {
    const prevExp = expRef.current;
    const newExp = prevExp + amount;
    expRef.current = newExp;

    const preLevel = determineLevel(prevExp, expTable);
    const postLevel = determineLevel(newExp, expTable);

    // handle level up logic 
    if (postLevel > preLevel) {
      handleAddMessage(`Congratulations! You just advanced a Woodcutting level. You are now level ${postLevel}.`);
      displayNewMilestone(postLevel);
      handleStopGlobalChop();
    }
    
    setStats(prevStats => ({
      ...prevStats,
      expWoodcutting: newExp,
      levelWoodcutting: postLevel
    }));

    setWoodcuttingExp(newExp);

    return false; // keep chopping
  }

  function handleStartGlobalChop() {
    if (isChoppingRef.current) {
        setMessages(prev => [...prev, "You are already busy chopping."]);
        return false; // stop action if player is already chopping
    }
    setIsChopping(true);
    isChoppingRef.current = true;
    return true;
  }

  function handleStopGlobalChop() {
    setIsChopping(false);
    isChoppingRef.current = false;
  }

  function displayNewMilestone(newLevel) {
    const unlockedTree = LOGS.find(el => el.levelRequired === newLevel);

    if (unlockedTree) {
      handleAddMessage(`You can now cut down ${unlockedTree.tree}s.`);
    }
  }

  return (

    <Routes>

      {/* Pages with header and footer */}
      <Route element={<MainLayout 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />} >
        <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/login' element={<Login 
          userId={userId}
          setUserId={setUserId}
          onLoginSuccess={handleLoginSuccess}
        />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
      

      {/* No header and footer */}
      <Route path='/game' element={
        <div className='game-layout'>
          <div className='area-gameworld'>
            <GameInterface 
              inventory={inventory} 
              messages={messages}
              currentLevel={currentLevel}
              isChopping={isChopping}
              expRef={expRef} 
              isChoppingRef={isChoppingRef}
              onStartGlobalChop={handleStartGlobalChop}
              onStopGlobalChop={handleStopGlobalChop}
              onGainExp={handleGainExp}
              onAddToInventory={handleAddToInventory}
              onAddMessage={handleAddMessage}
            />
          </div>

          <div className='area-messages'>
            <MessageLog messages={messages} />
          </div>

          <div className='area-interface'>
            <InterfaceTabs
              stats={stats}
              expTable={expTable}
              inventory={inventory}
              messages={messages}
              woodcuttingExp={woodcuttingExp}
              currentLevel={currentLevel}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onDropItem={handleDropItem}
            />
          </div>
        </div>
      }>
      </Route>
      
    </Routes>
  )
}

export default App;
