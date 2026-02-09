import { useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';


const GameInterface = () => {

    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0

    return (
        <>
            <Tree isNodeAvailable={isNodeAvailable} setIsNodeAvailable={setIsNodeAvailable} setMessages={setMessages} woodcuttingExp={woodcuttingExp} setWoodcuttingExp={setWoodcuttingExp}/>
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
