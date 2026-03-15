import { LOGS } from '../../../data/logs';
import Tree from './Tree';
import Axe from './Axe';

const GameInterface = ({ inventory, onAddToInventory, onAddMessage, onGainExp, onStartGlobalChop, onStopGlobalChop, currentLevel, isChopping, isChoppingRef }) => {

    // render 4 Trees, 2 Oak trees, 1 Willow tree
    const forest = ["Tree", "Tree", "Tree", "Tree", "Oak tree", "Oak tree", "Willow tree"];

    return (
        <div className='game-viewport game-layout'>
            <div className='area-gameworld forest-container'>
                <div className='tree-grid'>
                    {forest.map((treeName, index) => {
                        const treeObj = LOGS.find(el => el.tree === treeName);

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

                    {isChopping && <Axe />}
                </div>
            </div>
        </div>
    );
};

export default GameInterface;
