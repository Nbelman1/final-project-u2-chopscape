import { determineLevel } from '../../GameInterface/utils/woodcuttingUtils';

const SkillsPanel = ({ woodcuttingExp, expTable }) => {
    const currentLevel = determineLevel(woodcuttingExp, expTable);

    return (
        <>
            <p>Woodcutting: {currentLevel} / {currentLevel}</p>
            {/* optional chaining prevents crash, toLocaleString adds commas to exp */}
            <p>Experience: {woodcuttingExp?.toLocaleString() || 0}</p>
        </>
    );
};

export default SkillsPanel;
