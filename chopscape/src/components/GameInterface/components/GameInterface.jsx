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

        if (unlockedTree && preChopLevel !== postChopLevel) {
            setMessages(prev => [...prev, `You can now cut down ${unlockedTree.tree}s.`]);
        };
    }

    function startGlobalChop() {
        if (isChoppingRef.current) {
            setMessages(prev => [...prev, "You are already busy chopping."]);
            return; // stop action if player is already chopping
        }
        setMessages(prev => [...prev, "You swing your axe at the tree."]);
        setIsChopping(true);
        isChoppingRef.current = true;
        return true;
    }

    function stopGlobalChop() {
        setIsChopping(false);
        isChoppingRef.current = false;
    }

    function handleGainExp(amount) {
        const prevExp = woodcuttingExp; // exp before chop
        const newExp = prevExp + amount;

        displayLevelUp(prevExp, newExp); 
        displayNewMilestone(prevExp, newExp);

        setWoodcuttingExp(newExp);

        return newExp;
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
                    onAddToInventory={(log) => setInventory(prev => ({...prev, [log]: (prev[log] || 0) + 1}))}
                    onStartGlobalChop={startGlobalChop}
                    onStopGlobalChop={stopGlobalChop}
                />
            ))}
            <MessageLog messages={messages} />
        </>
    );
};

export default GameInterface;
