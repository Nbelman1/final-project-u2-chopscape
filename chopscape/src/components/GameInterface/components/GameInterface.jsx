import { useRef, useState } from 'react';
import Tree from './Tree';
import MessageLog from './MessageLog';
import { LOGS } from '../../../data/logs';
import { CHOP_CHANCES } from '../../../data/chop-chance';
import { determineLevel } from '../utils/woodcuttingUtils';
import { hasLevel } from '../utils/woodcuttingUtils';


const GameInterface = () => {

    // TODO: 
    // add a timer to respawn it, 
    // add a log item to your inventory, and a 
    // add function to check if your inventory is full before letting you chop

    
    const [messages, setMessages] = useState([]);
    const [woodcuttingExp, setWoodcuttingExp] = useState(13360); // TODO: change back to 0

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
            {LOGS.map((treeObj, index) => (
                <Tree
                    key={`{treeObj.tree}-${index}`}
                    treeData={treeObj}
                    woodcuttingLevel={currentLevel}
                    onGainExp={(amount) => setWoodcuttingExp(prev => prev + amount)}
                    onAddMessage={(msg) => setMessages(prev => [...prev, msg])}
                    onAddToInventory={(log) => setInventory(prev => ({...prev, [log]: (prev[log] || 0) + 1}))}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
