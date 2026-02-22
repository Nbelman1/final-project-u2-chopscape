import { useRef, useState } from 'react';
import { CHOP_CHANCES } from '../../../data/chop-chance';
// import { startChopping } from './GameInterface';

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


const Tree = ({ treeData, woodcuttingLevel, isChoppingRef, onGainExp, onAddMessage, onAddToInventory, onStartGlobalChop, onStopGlobalChop }) => {
    
    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const timerRef = useRef(null); // store and clear interval
    const timeElapsedRef = useRef(0);

    // TODO: check if player has room in inventory


    // check if tree is available
    function isTreeAvailable(isNodeAvailable) {
        if (isNodeAvailable) {
            return true;
        } else if (!isNodeAvailable) {
            setMessages(prev => [...prev, "The tree needs time to grow."]);
            return false;
        }
    }

    // start timer after first successful chop
    function startDepletionTimer() {
        // if there's a timer running, clear it 
        if (timerRef.current) clearInterval(timerRef.current);

        // timer interval set to 1000 ms (1 second)
        timerRef.current = setInterval(() => {
            timeElapsedRef.current += 1000; // update ref every 1 second
            setTimeElapsed(prev => prev + 1000); // update state for UI
        }, 1000);
    }

    // start timer after tree is felled
    function startRespawnTimer() {
        const { respawnTimeMin, respawnTimeMax } = treeData;
        
        // for normal trees, calculate random respawn time
        const randomDelay = Math.floor(Math.random() * (respawnTimeMax - respawnTimeMin + 1)) + respawnTimeMin;

        setTimeout(() => {
            setIsNodeAvailable(true);
        }, randomDelay);
    }

    // clean up states/refs when tree is felled
    function fellTree(treeData) {
        clearInterval(timerRef.current);
        setIsNodeAvailable(() => false);
        onStopGlobalChop(false);
        onAddMessage(`With a mighty swing, you fell the ${treeData.tree}.`);
        timeElapsedRef.current = 0;
        startRespawnTimer();
    }

    function handleLocalClick() {
        if (!isTreeAvailable) return;

        if (woodcuttingLevel < treeData.levelRequired) {
            onAddMessage(`You need a Woodcutting level of ${treeData.levelRequired} to chop down this ${treeData.tree}.`);
            return;
        }

        const canStart = onStartGlobalChop();

        if (canStart) {
            onAddMessage("You swing your axe at the tree.");
            rollForSuccess(woodcuttingLevel, treeData);
        }
    }

    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeData) {
        if (!isChoppingRef.current) return; // guard clause 
        
        const successRate = CHOP_CHANCES[woodcuttingLevel - 1].successRate; // account for 0-based indexing
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll

        if (isSuccessful) {
            // onAddToInventory(treeData.logType);
            
            onAddMessage(`You get some ${treeData.logType}.`);
            
            // start timer on successful chop
            if (timeElapsedRef.current === 0 && treeData.lifeTime > 0) {
                startDepletionTimer();
            }

            // check if tree should fall
            if (timeElapsedRef.current >= treeData.lifeTime) {
                fellTree(treeData);
            }

            const levelWasGained = onGainExp(treeData.expGained);

            // check for level up
            if (levelWasGained) return;

        } else {
            onAddMessage("Your axe splinters the bark. You take another swing.");
        }

        // queue next axe swing
        setTimeout(() => {
            if (isChoppingRef.current) {    
                rollForSuccess(woodcuttingLevel, treeData);
            }
        }, treeData.timeBetweenChops); // 2.4 second gap between rolls
    }

    return (
        <div className='tree-container'>
            <img 
                src={isNodeAvailable ? treeData.imagePath : '/images/stump.png'}
                alt={isNodeAvailable ? `A ${treeData.tree}.` : 'A tree stump.'}
                className={'tree-size'}
                onClick={() => handleLocalClick()}
            />
            <h3>{isNodeAvailable ? treeData.tree : `Stump (${treeData.tree})`}</h3>
            
        </div>
    );
};

export default Tree;
