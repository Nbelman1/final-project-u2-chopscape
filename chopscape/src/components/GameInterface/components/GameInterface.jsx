import { useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';
import { LOGS } from '../../../data/logs';


const GameInterface = () => {

    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0

    return (
        <>
            {LOGS.map((treeObj) => (
                <Tree
                    key={treeObj.tree}
                    treeData={treeObj}
                    woodcuttingLevel={currentLevel}
                    rollForSuccess={rollForSuccess}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
