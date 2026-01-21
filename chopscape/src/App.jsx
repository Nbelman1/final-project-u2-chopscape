import { useState } from 'react';
import './App.css';
import './components/UserInterface/InterfaceTabs/interface-styles.css';
import InterfaceTabs from './components/UserInterface/InterfaceTabs/InterfaceTabs';

function App() {

  const [activeTab, setActiveTab] = useState("combat");

  return (
    <>
      <InterfaceTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </>
  )
}

export default App;
