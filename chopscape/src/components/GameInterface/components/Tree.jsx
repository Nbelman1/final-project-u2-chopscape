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

const Tree = ({ isNodeAvailable, setMessages, woodcuttingExp, setWoodcuttingExp }) => {

    const [isChopping, setIsChopping] = useState(false);
    const [woodcuttingLevel, setWoodcuttingLevel] = useState(1);

    // check if tree is available
    function isTreeAvailable(isNodeAvailable) {
        if (isNodeAvailable) {
            setMessages(prev => [...prev, "You swing your axe at the tree."]);
            return true;
        } else if (!isNodeAvailable) {
            setMessages(prev => [...prev, "Please wait for logs to grow back."]);
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
                    startChopping(woodcuttingLevel, "tree");
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

    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeType) {
        console.log("woodcutting exp before success: " + woodcuttingExp);
        console.log("running rollForSuccess");

        const index = woodcuttingLevel - 1; // account for 0-based indexing
        const successRate = CHOP_CHANCES[index].successRate;
        const isSuccess = Math.random() < successRate; // success if rate is higher than roll

        // find tree object in LOGS array
        const treeObj = LOGS.find(obj => obj.treeType = treeType);
        
        if (!treeObj) {
            setMessages(prev => [...prev, "Error: tree type not found."]);
        }

        if (isSuccess) {
            setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
            const newWoodcuttingExp = woodcuttingExp + treeObj.expGained;
            setWoodcuttingExp(newWoodcuttingExp);
            // TODO: add +1 logs to inventory
            console.log("woodcutting exp after success: " + newWoodcuttingExp);
        }
        // TODO: track level up, print message to log
    }

    // throttle chopping action
    function startChopping(woodcuttingLevel, treeType) {
        console.log("running startChopping");
        if (isChopping) return; // stop action if player is already chopping 
        setIsChopping(true); // start chopping tree 
        rollForSuccess(woodcuttingLevel, treeType);
        setTimeout(() => {
            setIsChopping(false);
        }, 2400); // 2400 ms = 2.4 seconds
        // FIXME: get rollForSuccess to run every 2.4 seconds on failure instead of just running once 
    }

    // TODO: if treeType = tree, setIsAvailable(false) and start timer 

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
