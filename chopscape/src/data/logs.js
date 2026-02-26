// holds static data for trees
// all times are measured in milliseconds (1000 ms = 1 second)

export const LOGS = [
    { 
        tree: "Tree",
        levelRequired: 1,
        logType: "Logs",
        expGained: 25,
        harvestLimit: 1, 
        lifeTime: 0, // normal trees are felled from 1 successful chop
        timeBetweenChops: 2400, // roll successRate from chop-chance.js every chop
        respawnTimeMin: 36000, // normal tree respawn randomly between 36s and 60s
        respawnTimeMax: 60000, 
        imagePath: "/images/tree.png",
        logImagePath: "/images/logs.png"
    },
    { 
        tree: "Oak tree",
        levelRequired: 15,
        logType: "Oak logs",
        expGained: 37,
        harvestLimit: Infinity, // harvest based on successRate and lifeTime
        lifeTime: 5000, // TODO: change back to 27000
        timeBetweenChops: 2400,
        respawnTimeMin: 8400, // consistent respawn time, every 8.4s
        respawnTimeMax: 8400, 
        imagePath: "/images/oak-tree.png",
        logImagePath: "/images/oak-logs.png"
    },
    { 
        tree: "Willow tree",
        levelRequired: 30,
        logType: "Willow logs",
        expGained: 67,
        harvestLimit: Infinity,  // harvest based on successRate and lifeTime
        lifeTime: 5000, // TODO: change back to 30000
        timeBetweenChops: 2400,
        respawnTimeMin: 8400, // consistent respawn time, every 8.4s
        respawnTimeMax: 8400, 
        imagePath: "/images/willow-tree.png",
        logImagePath: "/images/willog-logs.png"
    },
];