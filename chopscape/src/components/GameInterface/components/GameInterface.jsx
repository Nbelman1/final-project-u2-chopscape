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

    function displayLevelRequired(treeObj) {
        const { tree, levelRequired } = treeObj;

        if (!hasLevel(currentLevel, levelRequired)) {
            setMessages(prev => [...prev, `You need a Woodcutting level of ${treeObj.levelRequired} to chop down this ${tree}.`]);
            return false;
        }
        return true;
    }

    // display level up message if applicable
    function displayLevelUp(currentExp, newExp) {
        const beginningLevel = determineLevel(currentExp);
        const levelAfterSuccess = determineLevel(newExp);

        if (beginningLevel !== currentLevel) {
            setMessages(prev => [...prev, `Congratulations! You just advanced a Woodcutting level. You are now level ${currentLevel}.`]);
        }
    }

    // display message that higher tier tree is available
    function displayNewMilestone(treeObj) {
        const currentIndex = LOGS.findIndex(el => el.tree === treeObj.tree); // index of current tree in LOGS array 
        const higherTierTree = LOGS[currentIndex + 1]; // index of higher level tree
        
        console.log("higher tier tree " + higherTierTree.tree);
            if (higherTierTree && currentLevel === higherTierTree.levelRequired) { // only show if there is a higher tier tree
                setMessages(prev => [...prev, `You can now cut down ${higherTierTree.tree}s.`]);
            };
    }

    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeType) {
        console.log("woodcutting exp before success: " + woodcuttingExp);
        console.log("running rollForSuccess");

        const index = woodcuttingLevel - 1; // account for 0-based indexing
        const successRate = CHOP_CHANCES[index].successRate;
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll
        const treeObj = LOGS.find(obj => obj.treeType = treeType); // tree object in LOGS that matches the name of treeType entered
        
        if (!treeObj) {
            setMessages(prev => [...prev, "Error: tree type not found."]);
            setIsChopping(false);
            return;
        }

        if (isSuccessful) {
            setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
            const newExp = woodcuttingExp + treeObj.expGained;

            displayLevelUp(woodcuttingExp, newExp);

            setWoodcuttingExp(newExp);

            displayNewMilestone(treeObj);

            // TODO: add +1 logs to inventory

            // TODO: add logic to setIsAvailable(false) depending on tree type 
            console.log("woodcutting exp after success: " + newExp);
            console.log("tree = unavailable");
        } else {
            setMessages(prev => [...prev, "Your axe splinters the bark. You take another swing."]);
            setTimeout(() => {
                startChopping(woodcuttingLevel, treeObj.treeType);
            }, treeObj.timeBetweenChops); // 2400 ms = 2.4 second gap between rolls
        }
    }

    // master chopping sequence
    function startChopping(woodcuttingLevel, treeObj) {
        console.log("running startChopping");
        console.log("leve before chopping: " + woodcuttingLevel);

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
