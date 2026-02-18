import { useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';
import { LOGS } from '../../../data/logs';
import { CHOP_CHANCES } from '../../../data/chop-chance';
import { determineLevel } from '../utils/woodcuttingUtils';
import { hasLevel } from '../utils/woodcuttingUtils';


const GameInterface = () => {

    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [isChopping, setIsChopping] = useState(false);
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0

    const currentLevel = determineLevel(woodcuttingExp);

    // check if tree is available
    function isTreeAvailable() {
        if (isNodeAvailable) {
            return true;
        } else if (!isNodeAvailable) {
            setMessages(prev => [...prev, "Please wait for tree to grow back."]);
            return false;
        }
    }

    // if level requirement not met, display message
    function displayLevelRequired(treeObj) {
        const { tree, levelRequired } = treeObj;

        if (!hasLevel(currentLevel, levelRequired)) {
            setMessages(prev => [...prev, `You need a Woodcutting level of ${treeObj.levelRequired} to chop down this ${tree}.`]);
            return false;
        }
        return true;
    }

    // on level up, display level up message 
    function displayLevelUp(currentExp, newExp) {
        const preChopLevel = determineLevel(currentExp);
        const postChopLevel = determineLevel(newExp);

        if (preChopLevel !== postChopLevel) {
            setMessages(prev => [...prev, `Congratulations! You just advanced a Woodcutting level. You are now level ${postChopLevel}.`]);
        }
    }

    // if higher tier tree is unlocked, display message 
    function displayNewMilestone(newExp) {
        const currentLevel = determineLevel(newExp);
        const unlockedTree = LOGS.find(el => el.levelRequired === currentLevel);
                    
        if (unlockedTree) {
            setMessages(prev => [...prev, `You can now cut down ${unlockedTree.tree}s.`]);
        };
    }

    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeObj) {

        const index = woodcuttingLevel - 1; // account for 0-based indexing
        const successRate = CHOP_CHANCES[index].successRate;
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll
        
        if (isSuccessful) {
            setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
            const newExp = woodcuttingExp + treeObj.expGained;

            setWoodcuttingExp(newExp);

            displayLevelUp(woodcuttingExp, newExp);
            displayNewMilestone(newExp);

            // TODO: add +1 logs to inventory

            // TODO: add logic to setIsAvailable(false) depending on tree type 
        } else {
            setMessages(prev => [...prev, "Your axe splinters the bark. You take another swing."]);
            setTimeout(() => {
                startChopping(woodcuttingLevel, treeObj);
            }, treeObj.timeBetweenChops); // 2.4 second gap between rolls
        }
    }

    // master chopping sequence
    function startChopping(woodcuttingLevel, treeObj) {

        if (isChopping) {
            setMessages(prev => [...prev, "You are already busy chopping."]);
            return; // stop action if player is already chopping 
        }

        isTreeAvailable(treeObj); // check node availability

        displayLevelRequired(treeObj); // check player's level

        setIsChopping(true); // start chopping tree 
        setMessages(prev => [...prev, "You swing your axe at the tree."]);
        
        rollForSuccess(woodcuttingLevel, treeObj); // initiate chopping logic  
    }


    return (
        <>
            {LOGS.map((treeObj) => (
                <Tree
                    key={treeObj.tree}
                    treeData={treeObj}
                    woodcuttingLevel={currentLevel}
                    onStartChopping={startChopping}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
