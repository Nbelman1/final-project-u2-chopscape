import { useRef, useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';
import { LOGS } from '../../../data/logs';
import { CHOP_CHANCES } from '../../../data/chop-chance';
import { determineLevel } from '../utils/woodcuttingUtils';
import { hasLevel } from '../utils/woodcuttingUtils';


const GameInterface = ({ inventory, messages, onAddToInventory, onAddMessage, woodcuttingExp, onGainExp, onStartGlobalChop, onStopGlobalChop, currentLevel, isChoppingRef }) => {

    // TODO: 
    // add a timer to respawn it, 
    // add a log item to your inventory, and a 
    // add function to check if your inventory is full before letting you chop

    return (
        <>
            {LOGS.map((treeObj, index) => (
                <Tree
                    key={`{treeObj.tree}-${index}`}
                    treeData={treeObj}
                    currentLevel={currentLevel}
                    inventory={inventory}
                    isChoppingRef={isChoppingRef}
                    onGainExp={onGainExp}
                    onAddMessage={onAddMessage}
                    onAddToInventory={onAddToInventory}
                    onStartGlobalChop={onStartGlobalChop}
                    onStopGlobalChop={onStopGlobalChop}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
