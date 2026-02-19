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
    const [isChopping, setIsChopping] = useState(false);
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0
    
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timerRef = useRef(null); // store and clear interval

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

        // timer interval set to 1 second = 1000 ms
        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1000);
        }, 1000);
    }

    // check if tree should fall after next successful chop
    function isFinalChop(treeObj) {
        return timeElapsed >= treeObj.lifeTime;
    }

    // clean up states/refs when tree is felled
    function fellTree() {
        clearInterval(timerRef.current);
        setTimeElapsed(0);
        setIsChopping(false);
    }

    // check if chop is successful
    function rollForSuccess(woodcuttingLevel, treeObj) {

        const index = woodcuttingLevel - 1; // account for 0-based indexing
        const successRate = CHOP_CHANCES[index].successRate;
        const isSuccessful = Math.random() < successRate; // success if rate is higher than roll
        
        if (isSuccessful) {
            const newExp = woodcuttingExp + treeObj.expGained;

            if (timeElapsed === 0 && treeObj.lifeTime > 0) {
                startDepletionTimer();
            }

            if (isFinalChop(treeObj)) {
                setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
                setWoodcuttingExp(newExp);

                displayLevelUp(woodcuttingExp, newExp);
                displayNewMilestone(woodcuttingExp, newExp)

                fellTree(treeObj);
            } else {
                setMessages(prev => [...prev, `You get some ${treeObj.logType}.`]);
                setWoodcuttingExp(newExp);

                displayLevelUp(woodcuttingExp, newExp);
                displayNewMilestone(woodcuttingExp, newExp);
            }

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

        if (!displayLevelRequired(treeObj)) return; // check player's level. stop if player's level is too low

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
