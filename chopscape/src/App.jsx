import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/UserInterface/InterfaceTabs/interface-styles.css';
import './components/GameInterface/game-interface-styles.css';
import InterfaceTabs from './components/UserInterface/InterfaceTabs/InterfaceTabs';
import Home from './components/MainPage/Home';
import CreateAccount from './components/MainPage/CreateAccount';
import Login from './components/MainPage/Login';
import GameInterface from './components/GameInterface/components/GameInterface';
import MessageLog from './components/GameInterface/components/MessageLog';
import MainLayout from './components/MainPage/MainLayout';
import { determineLevel } from './components/GameInterface/utils/woodcuttingUtils';
import { LOGS } from './data/logs';

// TODO: erase all console.logs

function App() {

  const [activeTab, setActiveTab] = useState("skills");
  const [inventory, setInventory] = useState(Array(28).fill(null));
  const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0
  const [messages, setMessages] = useState([]);
  const [isChopping, setIsChopping] = useState(false);
  
  const expRef = useRef(woodcuttingExp);
  const isChoppingRef = useRef(false);

  const currentLevel = determineLevel(woodcuttingExp);

  function handleAddMessage(msg) {
    setMessages(prev => [...prev, msg]);
  }

  function handleAddToInventory(logType) {
    setInventory(prev => {
        const firstEmptySlot = prev.indexOf(null);

        if (firstEmptySlot !== -1) {
            const newInventory = [...prev];
            newInventory[firstEmptySlot] = { name: logType, id: Date.now() };
            return newInventory;
        } else {
            onAddMessage("Your inventory is too full to hold any more logs.");
            return prev;
        }
    });
  }

  function handleDropItem(index) {
    setInventory(prev => {
      const newInventory = [...prev];
      newInventory[index] = null; // clear this inventory slot
      return newInventory;
    });
  }

  function handleGainExp(amount) {
    const prevExp = expRef.current;
    const newExp = prevExp + amount;
    
    expRef.current = newExp;
    setWoodcuttingExp(newExp);

    const preLevel = determineLevel(prevExp);
    const postLevel = determineLevel(newExp);

    if (postLevel > preLevel) {
      handleAddMessage(`Congratulations! You just advanced a Woodcutting level. You are now level ${postLevel}.`);
      displayNewMilestone(postLevel);
      handleStopGlobalChop();
      return true;
    }
    return false; // nothing to see here - keep chopping
  }

  function handleStartGlobalChop() {
    if (isChoppingRef.current) {
        setMessages(prev => [...prev, "You are already busy chopping."]);
        return; // stop action if player is already chopping
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
    <BrowserRouter>
      <Routes>

        {/* Pages with header and footer */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/login' element={<Login />} />
        </Route>
        

        {/* No header and footer */}
        <Route path='/game' element={
          <div className='game-container'>
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
            <MessageLog />
            <InterfaceTabs 
              inventory={inventory}
              activeTab={activeTab} 
              messages={messages}
              woodcuttingExp={woodcuttingExp}
              setActiveTab={setActiveTab}
              onDrop={handleDropItem}
            />
          </div>
        }>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
