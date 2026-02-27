import Tree from './Tree';
import { LOGS } from '../../../data/logs';

const GameInterface = ({ inventory, onAddToInventory, onAddMessage, onGainExp, onStartGlobalChop, onStopGlobalChop, currentLevel, isChoppingRef }) => {

    // render 4 Trees, 2 Oak trees, 1 Willow tree
    const forest = ["Tree", "Tree", "Tree", "Tree", "Oak tree", "Oak tree", "Willow tree"];

    return (
        <div className='tree-grid'>
            {forest.map((treeName, index) => {
                console.log(`Rendering tree ${index}: ${treeName}`);
                const treeObj = LOGS.find(el => el.tree === treeName);

                if (!treeObj) return null;
                
                return (
                    <Tree
                        key={`${treeName}-${index}`}
                        treeData={treeObj}
                        currentLevel={currentLevel}
                        inventory={inventory}
                        isChoppingRef={isChoppingRef}
                        onGainExp={onGainExp}
                        onAddMessage={onAddMessage}
                        onAddToInventory={onAddToInventory}
                        onStartGlobalChop={onStartGlobalChop}
                        onStopGlobalChop={onStopGlobalChop}
                    />
                );
            })}
        </div>
    );
};

export default GameInterface;
