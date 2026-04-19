import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import './components/UserInterface/InterfaceTabs/InterfaceTabs.css';
import './components/GameInterface/GameInterface.css';
import './components/MainPage/MainPage.css';
import InterfaceTabs from './components/UserInterface/InterfaceTabs/InterfaceTabs';
import Home from './components/MainPage/Home/Home';
import CreateAccount from './components/MainPage/CreateAccount';
import Login from './components/MainPage/Login';
import GameInterface from './components/GameInterface/components/GameInterface';
import MessageLog from './components/UserInterface/InterfaceTabs/MessageLog';
import MainLayout from './components/MainPage/MainLayout';
import Settings from './components/MainPage/Settings';
import ConfirmationModal from './components/MainPage/ConfirmationModal';
import { determineLevel } from './components/GameInterface/utils/woodcuttingUtils';
import { LOGS } from './data/logs';
import RotateOverlay from './components/MainPage/RotateOverlay';

function useAutoSave(userId, statsData, isLoggedIn, pathname) {
  const dataRef = useRef(statsData);
  dataRef.current = statsData;

  useEffect(() => { // only auto save if user started game session
    if (!isLoggedIn || pathname !== '/game') {
      return;
    }

    const save = async () => {
      if (!isLoggedIn || !userId ) return;
      try {
        await syncUserStats(userId, dataRef.current);
      } catch (error) {
        throw error;
      }
    };

      const interval = setInterval(save, 5000); // 5 seconds
      return () => clearInterval(interval);
  }, [isLoggedIn, pathname, userId]);

  return {
    forceSave: () => syncUserStats(userId, dataRef.current)
  };
}
  

async function syncUserStats(userId, statsData) {
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

// persistence on page refresh - fetch session data from localStorage 
const savedSession = JSON.parse(localStorage.getItem('userSession'));

function App() {

  // states
  const [stats, setStats] = useState(savedSession || {
    userId: null,
    expWoodcutting: 0,
    levelWoodcutting: 1,
    inventory: Array(28).fill(null) // create empty slots for fetch to fill
  });
  const [inventory, setInventory] = useState(savedSession?.inventory || Array(28).fill(null));
  const [woodcuttingExp, setWoodcuttingExp] = useState(savedSession?.expWoodcutting || 0);
  const [messages, setMessages] = useState([]);
  const [isChopping, setIsChopping] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
  const [isLoggedIn, setIsLoggedIn] = useState(!!savedSession);
  const [expTable, setExpTable] = useState([]);
  const [userId, setUserId] = useState(() => {
    const savedId = localStorage.getItem('userId');
    return savedId ? savedId : null;
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // refs
  const expRef = useRef(woodcuttingExp);
  const isChoppingRef = useRef(false);

  // custom hooks
  const navigate = useNavigate();
  const { pathname } = useLocation(); // current URL path

  // manage auto-save timer
  const { forceSave } = useAutoSave(stats.userId, stats, isLoggedIn, pathname);

  // default to level 1 while waiting for promise 
  const currentLevel = expTable.length > 0 
    ? determineLevel(woodcuttingExp, expTable)
    : 1; 

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

  async function handleDeleteAccount() {
    await fetch(`http://localhost:8080/api/users/${stats.userId}`, {
      method: 'DELETE',
    });

    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setStats({ userId: null, expWoodcutting: 0, inventory: Array(28).fill(null) });
    expRef.current = 0;

    setIsDeleteModalOpen(false);
    navigate('/');
  }

  async function handleLogout() {

    const currentId = stats.userId;
    const currentData = { ...stats };

    // save progress
    if (currentId) {
      await syncUserStats(currentId, currentData);
    }

    // clear local storage, states (for UI), and refs (for engine)
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);

    const emptyInv = Array(28).fill(null);

    setStats({ 
      userId: null,
      expWoodcutting: 0,
      levelWoodcutting: 1,
      inventory: emptyInv
    });
    expRef.current = 0;
    setWoodcuttingExp(0);
    setInventory(emptyInv);
    setActiveTab("skills");
    setMessages([]);

    // return to home page 
    navigate('/');  
  }


  async function handleLoginSuccess(sessionData) {
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
      userId: sessionData.userId,
      username: sessionData.username,
      dateCreated: sessionData.dateCreated,
      expWoodcutting: sessionData.expWoodcutting,
      levelWoodcutting: sessionData.levelWoodcutting,
      inventory: freshInventory
    };

    setInventory(freshInventory);
    setStats(updatedStats); // for back end
    setWoodcuttingExp(sessionData.expWoodcutting); // for frontend / skills panel
    expRef.current = sessionData.expWoodcutting; // for engine
    setIsLoggedIn(true);
  };

  function handleAddMessage(msg) {
    setMessages(prev => [...prev, msg]);
  }

  function handleAddToInventory(logName) {

    const newInventory = [...stats.inventory];
    const emptySlotIndex = newInventory.findIndex(slot => slot === null);

    // guard clause
    if (!isLoggedIn || expTable.length === 0) return;

    if (emptySlotIndex === -1) {
      handleAddMessage("Your inventory is too full to hold any more logs.");
      handleStopGlobalChop();
      return;
    }

    // if available inventory slot, update item object 
      newInventory[emptySlotIndex] = {
        itemName: logName,
        quantity: 1,
        slotPosition: emptySlotIndex
      };
    
    // sync backend (stats state) and frontend (inventory state)
    setStats(prevStats => ({ ...prevStats, inventory: newInventory }));
    setInventory(newInventory);
  }

  function handleDropItem(index) {
    const newInventory = [...stats.inventory];
    newInventory[index] = null;
    
    // set Stats state for backend 
    setStats(prev => ({
        ...prev,
        inventory: newInventory
    }));

    // set Inventory state for frontend
    setInventory(newInventory);

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
    <>
      {/* only rendered on small screens */}
      <RotateOverlay />

      {/* only rendered in Settings screen */}
      <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          message="This will permanently delete your account. Are you sure?"
          onConfirm={handleDeleteAccount}
          onCancel={() => setIsDeleteModalOpen(false)}
      />

      <Routes>

        {/* Pages with header and footer */}
        <Route element={<MainLayout 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />} >
          <Route path='/' element={<Home 
            isLoggedIn={isLoggedIn}
          />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/login' element={<Login 
            userId={userId}
            setUserId={setUserId}
            onLoginSuccess={handleLoginSuccess}
          />} />
          <Route path='/settings' element={<Settings
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            stats={stats}
            username={stats?.username}
          />} />
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
                onLogout={handleLogout}
                onDropItem={handleDropItem}
              />
            </div>
          </div>
        }>
        </Route>
        
      </Routes>

    </>
  )
}

export default App;
