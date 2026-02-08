// pass tree data as prop, reference data/logs.js when clicked 

import { useState } from 'react';
import tree from '../assets/tree.png';

{/* TODO: add function chopDown (woodcuttingLevel, treeType, axeType): 
                check that tree isAvailable
                check that woodcuttingLevel >= levelRequired
                start seconds timer
                every timeBetweenChops, roll successRate from chop-chance.js
                if normal tree {after successful chop, isAvailable = false, add message to MessageLog}
                    else if other tree {after lifeTime seconds, isAvailable = false}
                startRespawnTimer(respawnTimeMin, respawnTimeMax)
                remove "Chop down" clickable option from tree object  */}

const Tree = ({ isNodeAvailable, setMessages }) => {

    function checkIfNodeIsAvailable (isNodeAvailable) {
        isNodeAvailable? true : false;
    }

    function chopTree() {
        if (isNodeAvailable) {
            setMessages(prev => [...prev, "You swing your axe at the tree."]);
        }
    }

    function handleTreeClick() {
        chopTree();
    }


    return (
        <>
            

            <img 
                src={tree} alt='A standard tree' 
                className='tree-size' 
                onClick={handleTreeClick}
            />
        </>
    );
};

export default Tree;
