import { getExpToNextLevel, getExpAtNextLevel } from "../../GameInterface/utils/woodcuttingUtils";

const SkillsPanel = ({ stats, woodcuttingExp, expTable }) => {

    const expRemaining = getExpToNextLevel(stats.levelWoodcutting, woodcuttingExp, expTable);
    const expAtNextLevel = getExpAtNextLevel(stats.levelWoodcutting, expTable);

    return (
        <div className="pad-left">
            <p>Woodcutting: {stats.levelWoodcutting} / {stats.levelWoodcutting}</p>
            {/* format exp with commas */}
            <p>Experience: {woodcuttingExp?.toLocaleString() || 0}</p>
            <p>Next level at: {expAtNextLevel?.toLocaleString()}</p>
            <p>Remaining exp: {expRemaining?.toLocaleString()}</p>
        </div>
    );
};

export default SkillsPanel;
