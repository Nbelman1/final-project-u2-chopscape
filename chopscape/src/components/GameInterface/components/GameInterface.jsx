import { useRef, useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';
import { LOGS } from '../../../data/logs';
import { CHOP_CHANCES } from '../../../data/chop-chance';
import { determineLevel } from '../utils/woodcuttingUtils';
import { hasLevel } from '../utils/woodcuttingUtils';


const GameInterface = () => {

    // TODO: add logic to despawn the tree
    //  add a timer to respawn it, 
    // add a log item to your inventory, and a 
    // add function to check if your inventory is full before letting you chop

    const [isNodeAvailable, setIsNodeAvailable] = useState(true);
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0
    
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timeElapsedRef = useRef(0);
    const timerRef = useRef(null); // store and clear interval

    const [isChopping, setIsChopping] = useState(false);
    const isChoppingRef = useRef(false);

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
        } else {
            return true;
        }
    }

    // on level up, display level up message 
    function displayLevelUp(currentExp, newExp) {
        const preChopLevel = determineLevel(currentExp);
        const postChopLevel = determineLevel(newExp);

        if (preChopLevel !== postChopLevel) {
            setMessages(prev => [...prev, `Congratulations! You just advanced a Woodcutting level. You are now level ${postChopLevel}.`]);
            setIsChopping(false);
            isChoppingRef.current = false;
        }
    }

    // if higher tier tree is unlocked, display message 
    function displayNewMilestone(currentExp, newExp) {
        const preChopLevel = determineLevel(currentExp);
        const postChopLevel = determineLevel(newExp);

        const unlockedTree = LOGS.find(el => el.levelRequired === postChopLevel);
        
        console.log("unlocked tree", unlockedTree);

        if (unlockedTree && preChopLevel !== postChopLevel) {
            setMessages(prev => [...prev, `You can now cut down ${unlockedTree.tree}s.`]);
        };
    }

    // start timer after first successful chop
    function startDepletionTimer() {
        // if there's a timer running, clear it 
        if (timerRef.current) clearInterval(timerRef.current);

        // timer interval set to 1000 ms (1 second)
        timerRef.current = setInterval(() => {
            timeElapsedRef.current + 1000; // update ref every 1 second
            setTimeElapsed(prev => prev + 1000); // update state for UI
        }, 1000);
    }

    // clean up states/refs when tree is felled
    function fellTree() {
        clearInterval(timerRef.current);
        setTimeElapsed(0);
        timeElapsedRef.current = 0;
        setIsChopping(false);
        isChoppingRef.current = false;
    }


    // FIXME: stop player from chopping indefinitely 
    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeObj) {
        if (!isChoppingRef.current) return;
        
        const currentTime = timeElapsedRef.current;
        const successRate = CHOP_CHANCES[woodcuttingLevel -1 ].successRate; // account for 0-based indexing
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll
        
        console.log("running rollForSuccess");

        if (isSuccessful) {
            const newExp = woodcuttingExp + treeObj.expGained;

            // start timer on successful chop
            if (currentTime === 0 && treeObj.lifeTime > 0) {
                startDepletionTimer();
            }

            setWoodcuttingExp(newExp);
            setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
            displayLevelUp(woodcuttingExp, newExp);
            displayNewMilestone(woodcuttingExp, newExp)

            if (currentTime >= treeObj.lifeTime) {
                fellTree(treeObj);
                return; 
            }
        } else {
            setMessages(prev => [...prev, "Your axe splinters the bark. You take another swing."]);
        }

        // queue next axe swing
        setTimeout(() => {
            if (isChoppingRef.current) {    
                rollForSuccess(woodcuttingLevel, treeObj);
            }
        }, treeObj.timeBetweenChops); // 2.4 second gap between rolls
    }

    // master chopping sequence
    function startChopping(woodcuttingLevel, treeObj) {

        if (isChopping) {
            setMessages(prev => [...prev, "You are already busy chopping."]);
            return; // stop action if player is already chopping 
        }

        isTreeAvailable(treeObj); // check node availability

        if (!displayLevelRequired(treeObj)) return; // check player's level. stop if player's level is too low

        setIsChopping(true); // start chopping tree 
        isChoppingRef.current = true;
        setMessages(prev => [...prev, "You swing your axe at the tree."]);
        
        // initiate chopping logic
        rollForSuccess(woodcuttingLevel, treeObj);
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
