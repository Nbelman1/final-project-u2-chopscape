import { useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';


const GameInterface = () => {

    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [messages, setMessages] = useState([]);

    return (
        <>
            <Tree isNodeAvailable={isNodeAvailable} setIsNodeAvailable={setIsNodeAvailable} setMessages={setMessages} />
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
