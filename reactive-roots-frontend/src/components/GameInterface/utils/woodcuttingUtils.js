// returns player's woodcutting level 
export function determineLevel(exp, table) {
    // guard clause
    if (!table || table.length === 0) return 1;

    let level = 1;
    for (const obj of table) {
        if (exp >= obj.expRequired) {
            level = obj.level;
        } else {
            break;
        }
    }
    return level;
};

// checks if player has level required to chop desired tree 
export function hasLevel(playerLevel, requiredLevel) {
    return playerLevel >= requiredLevel;
}