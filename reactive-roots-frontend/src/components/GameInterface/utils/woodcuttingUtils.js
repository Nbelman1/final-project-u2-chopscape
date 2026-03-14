// returns player's woodcutting level 
export function determineLevel(exp, table) {
    // guard clause
    if (!table || table.length === 0) return 1;

    let currentLevel = 1;

    for (const entry of table) {
        const required = Number(entry.expRequired);
        const playerExp = Number(exp);

        if (playerExp >= required) {
            currentLevel = entry.level;
        } else {
            break; // stop looking when we find level that player is
        }
    }
    return currentLevel;
};

// checks if player has level required to chop desired tree 
export function hasLevel(playerLevel, requiredLevel) {
    return playerLevel >= requiredLevel;
}