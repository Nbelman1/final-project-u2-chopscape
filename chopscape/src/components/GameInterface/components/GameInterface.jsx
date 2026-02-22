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
    const expRef = useRef(woodcuttingExp);

    const [isChopping, setIsChopping] = useState(false);
    const isChoppingRef = useRef(false);

    const currentLevel = determineLevel(woodcuttingExp);

    const [inventory, setInventory] = useState({
        "Logs": 0,
        "Oak logs": 0,
        "Willow logs": 0
    });

    function handleAddToInventory(logType) {
        setInventory(prev => ({
            ...prev,
            [logType]: prev[logType] + 1
        }));
    }

    // on level up, display level up message 
    function displayLevelUp(newLevel) {
        setMessages(prev => [...prev, `Congratulations! You just advanced a Woodcutting level. You are now level ${newLevel}.`]);
        stopGlobalChop();
    }
    
    // if higher tier tree is unlocked, display message 
    function displayNewMilestone(newLevel) {
        const unlockedTree = LOGS.find(el => el.levelRequired === newLevel);
        if (unlockedTree) {
            setMessages(prev => [...prev, `You can now cut down ${unlockedTree.tree}s.`]);
        };
    }

    function handleGainExp(amount) {
        const prevExp = expRef.current;
        const newExp = prevExp + amount;
        
        expRef.current = newExp;
        setWoodcuttingExp(newExp);

        const preChopLevel = determineLevel(prevExp);
        const postChopLevel = determineLevel(newExp);

        if (postChopLevel > preChopLevel) {
            displayLevelUp(postChopLevel);
            displayNewMilestone(postChopLevel);
            return true; // level up, stop chopping
        }

        return false; // nothing to see here - keep chopping
    }

        function startGlobalChop() {
        if (isChoppingRef.current) {
            setMessages(prev => [...prev, "You are already busy chopping."]);
            return; // stop action if player is already chopping
        }
        setIsChopping(true);
        isChoppingRef.current = true;
        return true;
    }

    function stopGlobalChop() {
        setIsChopping(false);
        isChoppingRef.current = false;
    }

    return (
        <>
            {LOGS.map((treeObj, index) => (
                <Tree
                    key={`{treeObj.tree}-${index}`}
                    treeData={treeObj}
                    woodcuttingLevel={currentLevel}
                    isChoppingRef={isChoppingRef}
                    onGainExp={handleGainExp}
                    onAddMessage={(msg) => setMessages(prev => [...prev, msg])}
                    onAddToInventory={handleAddToInventory}
                    onStartGlobalChop={startGlobalChop}
                    onStopGlobalChop={stopGlobalChop}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
