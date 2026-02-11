import { useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';
import { LOGS } from '../../../data/logs';
import { determineLevel } from '../utils/woodcuttingUtils';


const GameInterface = () => {

    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0

    const currentLevel = determineLevel(woodcuttingExp);

    // check if tree is available
    function isTreeAvailable(isNodeAvailable) {
        if (isNodeAvailable) {
            setMessages(prev => [...prev, "You swing your axe at the tree."]);
            return true;
        } else if (!isNodeAvailable) {
            setMessages(prev => [...prev, "Please wait for tree to grow back."]);
            return false;
        }
    }

    function handleChopAction(treeObj) {
        const { tree, requiredLevel, expGained } = treeObj;

        if (hasLevel(woodcuttingLevel, requiredLevel)) {
            console.log(`starting to chop ${tree}`);
            startChopping(woodcuttingLevel, tree);
        } else {
            setMessages(prev => [...prev, `You need a Woodcutting level of ${requiredLevel} to chop down this ${tree}.`]);
        }
    }

     // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeType) {
        console.log("woodcutting exp before success: " + woodcuttingExp);
        console.log("running rollForSuccess");

        const index = woodcuttingLevel - 1; // account for 0-based indexing
        const successRate = CHOP_CHANCES[index].successRate;
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll
        const beginningLevel = woodcuttingLevel; // store level before chopping loop initiates

        const treeObj = LOGS.find(obj => obj.treeType = treeType); // tree object in LOGS that matches the name of treeType entered
        const currentIndex = LOGS.findIndex(obj => obj.treeType === treeType); // index of current tree in LOGS array 
        const higherTierTree = LOGS[currentIndex + 1]; // index of higher level tree

        if (!treeObj) {
            setMessages(prev => [...prev, "Error: tree type not found."]);
            setIsChopping(false);
            return;
        }

        if (isSuccessful) {
            setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
            const newWoodcuttingExp = woodcuttingExp + treeObj.expGained;
            setWoodcuttingExp(newWoodcuttingExp);
            setIsChopping(false);

            const currentLevel = determineLevel(newWoodcuttingExp);
            if (beginningLevel !== currentLevel) {
                setMessages(prev => [...prev, `Congratulations! You just advanced a Woodcutting level. You are now level ${currentLevel}.`]);
            }

            console.log("higher tier tree " + higherTierTree.tree);
            if (higherTierTree && currentLevel === higherTierTree.levelRequired) { // only show if there is a higher tier tree
                setMessages(prev => [...prev, `You can now cut down ${higherTierTree.tree}s.`]);
            }


            // TODO: add +1 logs to inventory
            console.log("woodcutting exp after success: " + newWoodcuttingExp);
            console.log("tree = unavailable");
        } else {
            setMessages(prev => [...prev, "Your axe splinters the bark. You take another swing."]);
            setTimeout(() => {
                startChopping(woodcuttingLevel, treeObj.treeType);
            }, 2400); // 2400 ms = 2.4 second gap between rolls
        }
    }

      // initiate chopping sequence
    function startChopping(woodcuttingLevel, treeType) {
        console.log("running startChopping");
        console.log("current level: " + woodcuttingLevel);

        if (isChopping) return; // stop action if player is already chopping 

        setIsChopping(true); // start chopping tree 
    
        rollForSuccess(woodcuttingLevel, treeType); // initiate chopping logic  
    }


    return (
        <>
            {LOGS.map((treeObj) => (
                <Tree
                    key={treeObj.tree}
                    treeData={treeObj}
                    onChop={handleChopAction}
                    woodcuttingLevel={currentLevel}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
