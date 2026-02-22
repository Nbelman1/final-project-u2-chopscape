const TABS = [
    {id: "skills", icon: "skills.png", label: "Skills", position: "top"},
    {id: "inventory", icon: "inventory.png", label: "Inventory", position: "top"},
    {id: "logout", icon: "logout.png", label: "Logout", position: "bottom"},
];

const InterfaceTabs = ({ activeTab, setActiveTab }) => {
    const topTabs = TABS.filter(tab => {return tab.position === "top"});
    const bottomTabs = TABS.filter(tab => {return tab.position === "bottom"});

    const renderTab = (tab) => {
        return (
        
        <div 
            key={tab.id}
            // if tab selected is active tab, its className = "active"
            className={`indiv-tab ${activeTab === tab.id ? "active" : ""}`}
            label={tab.label}
            onClick={() => setActiveTab(tab.id)}
        >
            <img 
                src={`/images/${tab.icon}`}
                alt={tab.label}
            />
        </div>
        );
    };

    return (
        <div className={`panel-wrapper panel-wrapper-${activeTab}`}>
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
