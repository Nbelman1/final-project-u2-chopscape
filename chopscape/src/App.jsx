import { useState } from 'react';
import './App.css';
import './components/UserInterface/InterfaceTabs/interface-styles.css';
import InterfaceTabs from './components/UserInterface/InterfaceTabs/InterfaceTabs';
import Header from './components/MainPage/Header';
import Home from './components/MainPage/Home';
import Footer from './components/MainPage/Footer';
import CreateAccount from './components/MainPage/CreateAccount';
import Login from './components/MainPage/Login';
import MessageLog from './components/UserInterface/MessageLog';

function App() {

  const [activeTab, setActiveTab] = useState("combat");

  return (
    <>
      <Header />
      <Home />
      <Footer />
      <CreateAccount />
      <Login />
      <MessageLog />
      <InterfaceTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </>
  )
}

export default App;
