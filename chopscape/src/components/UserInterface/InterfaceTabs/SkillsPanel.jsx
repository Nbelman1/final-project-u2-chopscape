const SkillsPanel = ({ woodcuttingExp, currentLevel }) => {
    return (
        <>
            {/* TODO: state: player experience */}
            {/* TODO: getLevelFromExp(currentExp) */}
            <p>Woodcutting: {currentLevel} / {currentLevel}</p>
            <p>Experience: {woodcuttingExp}</p>
        </>
    );
};

export default SkillsPanel;
