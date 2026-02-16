import { EXP_TABLE } from "../../../data/levels";

// returns player's woodcutting level 
export function determineLevel(woodcuttingExp) {
    let level = 1;
    for (const obj of EXP_TABLE) {
        if (woodcuttingExp >= obj.expRequired) {
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