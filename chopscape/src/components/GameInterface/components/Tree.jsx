import { useState } from 'react';
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
    
    // TODO: check if player has room in inventory


    // TODO: if treeType = tree, setIsAvailable(false) and start respawn timer 


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
