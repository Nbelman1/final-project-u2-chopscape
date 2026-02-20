import { useRef, useState } from 'react';
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


const Tree = ({ treeData, woodcuttingLevel, onStartChopping }) => {
    
    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const timerRef = useRef(null); // store and clear interval
    const timeElapsedRef = useRef(0);

    // TODO: check if player has room in inventory

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

    // clean up states/refs when tree is felled
    function fellTree(treeData) {
        clearInterval(timerRef.current);
        setTimeElapsed(0);
        timeElapsedRef.current = 0;
        setIsChopping(false);
        isChoppingRef.current = false;
        onAddMessage(`With a mighty swing, you fell the ${treeData.tree}.`);
    }

    function startRespawnTimer() {

    }

    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeData) {
        if (!isChoppingRef.current) return;
        
        const currentTime = timeElapsedRef.current; // current time on depletion timer 
        const successRate = CHOP_CHANCES[woodcuttingLevel -1 ].successRate; // account for 0-based indexing
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll

        if (isSuccessful) {
            const newExp = woodcuttingExp + treeData.expGained;

            // start timer on successful chop
            if (currentTime === 0 && treeData.lifeTime > 0) {
                startDepletionTimer();
            }

            onGainExp(treeData.expGained);
            onAddMessage(`You get some ${treeData.logType}.`);
            onAddToInventory(treeData.logType);

            displayLevelUp(woodcuttingExp, newExp);
            displayNewMilestone(woodcuttingExp, newExp)

            if (currentTime >= treeData.lifeTime) {
                fellTree(treeData);
                return; 
            }
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
                src={treeData.imagePath}
                alt={`A ${treeData.tree}.`}
                className='tree-size'
                onClick={() => onStartChopping(woodcuttingLevel, treeData)}
            />
            <h3>{treeData.tree}</h3>
            
        </div>
    );
};

export default Tree;
