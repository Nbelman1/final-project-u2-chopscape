import { useRef, useState } from 'react';
import Tree from './Tree';
import MessageLog from '../../UserInterface/InterfaceTabs/MessageLog';
import { LOGS } from '../../../data/logs';
import { CHOP_CHANCES } from '../../../data/chop-chance';
import { determineLevel } from '../utils/woodcuttingUtils';
import { hasLevel } from '../utils/woodcuttingUtils';

const GameInterface = ({ inventory, messages, onAddToInventory, onAddMessage, woodcuttingExp, onGainExp, onStartGlobalChop, onStopGlobalChop, currentLevel, isChoppingRef }) => {

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
        </>
    );
};

export default GameInterface;
