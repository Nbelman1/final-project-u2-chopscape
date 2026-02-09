// pass tree data as prop, reference data/logs.js when clicked 

import { useState } from 'react';
import tree from '../assets/tree.png';
import { EXP_TABLE } from '../../../data/levels';
import { LOGS } from '../../../data/logs';
import { CHOP_CHANCES } from '../../../data/chop-chance';

{/* TODO: add function chopDown (woodcuttingLevel, treeType, axeType): 
                check that tree isAvailable
                check that woodcuttingLevel >= levelRequired
                start seconds timer
                every timeBetweenChops, roll successRate from chop-chance.js
                if normal tree {after successful chop, isAvailable = false, add message to MessageLog}
                    else if other tree {after lifeTime seconds, isAvailable = false}
                startRespawnTimer(respawnTimeMin, respawnTimeMax)
                remove "Chop down" clickable option from tree object  */}

// TODO: add status bar for isChopping 

// TODO: add treeData object, use it as a prop
// Refactor functions to use treeData instead of searching LOGS array each click

const Tree = ({ isNodeAvailable, setMessages, woodcuttingExp, setWoodcuttingExp }) => {

    const [isChopping, setIsChopping] = useState(false);
    const [woodcuttingLevel, setWoodcuttingLevel] = useState(1);

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

    // check player's woodcutting level 
    function determineLevel(woodcuttingExp) {
        let currentLevel = 1;
        for (const obj of EXP_TABLE) {
            if (woodcuttingExp >= obj.expRequired) {
                currentLevel = obj.level;
            }
        }
        setWoodcuttingLevel(currentLevel); // update state
        return currentLevel; // use variable to record snapshot
    };

    // checks if player has level required to cut tree 
    function hasLevelRequired(treeType, woodcuttingLevel) {
        for (const treeObj of LOGS) {
            if (treeType == treeObj.tree) {
                if (woodcuttingLevel >= treeObj.levelRequired) {
                    startChopping(woodcuttingLevel, "Tree");
                    return true;
                } else {
                    const levelRequired = treeObj.levelRequired;
                    setMessages(prev => [...prev, `You need a Woodcutting level of ${levelRequired} to chop down this tree.`]);
                    return false;
                }
            } else {
                return "Error: tree type not recognized.";
            }
        }
    }

    // TODO: check if player has room in inventory

    function checkForLevelUp(woodcuttingExp, woodcuttingLevel) {
        
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

    // initial click on tree
    function startChopping(woodcuttingLevel, treeType) {
        console.log("running startChopping");
        console.log("current level: " + woodcuttingLevel);
        if (isChopping) return; // stop action if player is already chopping 

        setIsChopping(true); // start chopping tree 
    
        rollForSuccess(woodcuttingLevel, treeType); // initiate chopping logic  
    }

    // TODO: if treeType = tree, setIsAvailable(false) and start respawn timer 

    function handleTreeClick() {
        if (!isTreeAvailable(isNodeAvailable)) return; // cancel action if tree node is not yet available
        
        // TODO: check if player has space in inventory

        const currentLevel = determineLevel(woodcuttingExp);
        hasLevelRequired("Tree", currentLevel);
    }

    return (
        <>
            <img 
                src={tree} alt='A standard tree' 
                className='tree-size' 
                onClick={handleTreeClick}
            />
        </>
    );
};

export default Tree;
