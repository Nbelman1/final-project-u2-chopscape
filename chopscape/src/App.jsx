import { useState } from 'react';
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

// TODO: erase all console.logs

function App() {

  const [activeTab, setActiveTab] = useState("combat");

  console.log("Parent state: " + activeTab);

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
            <GameInterface />
            <MessageLog />
            <InterfaceTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div>
        }>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
