// TODO: add icons for each tab
const TABS = [
    {id: "combat", icon: "combat-options.png", label: "Combat options", position: "top"},
    {id: "skills", icon: "skills.png", label: "Skills", position: "top"},
    {id: "inventory", icon: "inventory.png", label: "Inventory", position: "top"},
    {id: "equipment", icon: "worn-equipment.png", label: "Worn equipment", position: "bottom"},
    {id: "logout", icon: "logout.png", label: "Logout", position: "bottom"},
    {id: "locked", icon: "lock.png", label: "Locked", position: "bottom"}
];

const InterfaceTabs = ({ activeTab, onTabClick }) => {
    const topTabs = TABS.filter(tab => {return tab.position === "top"});
    const bottomTabs = TABS.filter(tab => {return tab.position === "bottom"});

    const renderTab = (tab) => {
        return (
        
        <div 
            key={tab.id}
            // if tab selected is active tab, its className = "active"
            className={`indiv-tab ${activeTab === tab.id ? "active" : ""}`}
            label={tab.label}
            onClick={() => onTabClick(tab.id)}
        >
            <img 
                src={`/images/${tab.icon}`}
                alt={tab.label}
            />
        </div>
        );
    };

    return (
        <div className="panel-wrapper">
            <div className="tabs-row top-tabs">
                {topTabs.map(renderTab)}
            </div>
            <div className="tabs-row bottom-tabs">
                {bottomTabs.map(renderTab)}
            </div>
        </div>

    );
};

export default InterfaceTabs;
