// holds static data for trees
// all times are measured in seconds

export const LOGS = [
    { 
        tree: "Tree",
        levelRequired: 1,
        logType: "Logs",
        expGained: 25,
        harvestLimit: 1, 
        lifeTime: 0, // normal trees are felled from 1 successful chop
        timeBetweenChops: 2.4, // roll successRate from chop-chance.js every chop
        respawnTimeMin: 36, // normal tree respawn randomly between 36s and 60s
        respawnTimeMax: 60, 
        imagePath: "/images/tree.png"
    },
    { 
        tree: "Oak tree",
        levelRequired: 15,
        logType: "Oak logs",
        expGained: 37,
        harvestLimit: Infinity, // harvest based on successRate and lifeTime
        lifeTime: 27,
        timeBetweenChops: 2.4,
        respawnTimeMin: 27, // oak trees respawn consistently every 27s
        respawnTimeMax: 27, 
        imagePath: "/images/oak-tree.png"
    },
    { 
        tree: "Willow tree",
        levelRequired: 30,
        logType: "Willow logs",
        expGained: 67,
        harvestLimit: Infinity,  // harvest based on successRate and lifeTime
        lifeTime: 30,
        timeBetweenChops: 2.4,
        respawnTimeMin: 14, // consistent respawn time
        respawnTimeMax: 14, 
        imagePath: "/images/willow-tree.png"
    },
];