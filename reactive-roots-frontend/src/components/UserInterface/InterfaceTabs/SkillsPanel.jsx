import { determineLevel } from '../../GameInterface/utils/woodcuttingUtils';

const SkillsPanel = ({ stats, woodcuttingExp, expTable }) => {
    const currentLevel = determineLevel(woodcuttingExp, expTable);

    return (
        <>
            <p>Woodcutting: {stats.levelWoodcutting} / {stats.levelWoodcutting}</p>
            {/* optional chaining prevents crash, toLocaleString adds commas to exp */}
            <p>Experience: {woodcuttingExp?.toLocaleString() || 0}</p>
        </>
    );
};

export default SkillsPanel;
