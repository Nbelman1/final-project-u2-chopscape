const SkillsPanel = ({ skill, currentLevel }) => {
    return (
        <>
            {/* TODO: state: player experience */}
            {/* TODO: getLevelFromExp(currentExp) */}
            <p>${skill}: {currentLevel}</p>
        </>
    );
};

export default SkillsPanel;
