import { useRef, useState } from 'react';
import { CHOP_CHANCES } from '../../../data/chop-chance';

// TODO: add status bar for isChopping 

const Tree = ({ treeData, currentLevel, isChoppingRef, onGainExp, onAddMessage, onAddToInventory, onStartGlobalChop, onStopGlobalChop, inventory }) => {
    
    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const timerRef = useRef(null); // store and clear interval
    const timeElapsedRef = useRef(0);
    const localActionTimeoutRef = useRef(null);

    const activeSessionId = useRef(0); // current chopping loop

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
        activeSessionId.current += 1;
        onStopGlobalChop();

        if (localActionTimeoutRef.current) {
            clearTimeout(localActionTimeoutRef.current);
        }
        
        timeElapsedRef.current = 0;
        clearInterval(timerRef.current);
        setIsNodeAvailable(false);
        
        onAddMessage(`With a mighty swing, you fell the ${treeData.tree}.`);
        timeElapsedRef.current = 0;
        startRespawnTimer();
    }

    function handleLocalClick() {
        if (!isTreeAvailable) return;

        const isFull = !inventory.includes(null);
        if(isFull) {
            onAddMessage("Your inventory is too full to hold any more logs.");
            return;
        }

        if (currentLevel < treeData.levelRequired) {
            onAddMessage(`You need a Woodcutting level of ${treeData.levelRequired} to chop down this ${treeData.tree}.`);
            return;
        }

        const canStart = onStartGlobalChop();

        if (canStart) {
            activeSessionId.current += 1;
            const sessionId = activeSessionId.current;
            onAddMessage("You swing your axe at the tree.");
            rollForSuccess(currentLevel, treeData, sessionId);
        }
    }

    // check if chop is successful
    function rollForSuccess(currentLevel, treeData, sessionId) {
        console.log("chop tick for ", treeData.tree, " - global status: ", isChoppingRef.current);

        if (!isChoppingRef.current || sessionId !== activeSessionId.current) {
            console.log(`killing ghost loop for session ${sessionId}`);
            return;
        }

        if (!isChoppingRef.current) return; // guard clause 
        
        const levelIndex = currentLevel - 1;
        const chopData = CHOP_CHANCES[levelIndex]; // account for 0-based indexing
        if(!chopData) {
            console.log("could not find data for level:", currentLevel);
            return;
        }
        const successRate = chopData.successRate;
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll

        if (isSuccessful) {
            onAddToInventory(treeData.logType);
            onAddMessage(`You get some ${treeData.logType}.`);
            // start timer
            if (timeElapsedRef.current === 0 && treeData.lifeTime > 0) {
                startDepletionTimer();
            }
            // check if tree should fall
            if (timeElapsedRef.current >= treeData.lifeTime) {
                console.log("checking ", treeData.tree, ": timer is ", timeElapsedRef.current, " / need ", treeData.lifeTime);
                fellTree(treeData);
            }
            const levelWasGained = onGainExp(treeData.expGained);
            // check for level up
            if (levelWasGained) return;

        } else {
            onAddMessage("Your axe splinters the bark. You take another swing.");
        }

        // queue next axe swing
        localActionTimeoutRef.current = setTimeout(() => {
            if (isChoppingRef.current && sessionId === activeSessionId.current) {    
                rollForSuccess(currentLevel, treeData, sessionId);
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
