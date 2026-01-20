// TODO: add icons for each tab
const TABS = [
    {id: "combat", icon: "TBD", label: "Combat options"},
    {id: "skills", icon: "TBD", label: "Skills"},
    {id: "inventory", icon: "TBD", label: "Inventory"},
    {id: "equipment", icon: "TBD", label: "Worn equipment"},
    {id: "logout", icon: "TBD", label: "Logout"}
];

const InterfaceTabs = ({ activeTab, onTabClick }) => {
    return (
        <div className="panel-wrapper">
            <div className="tabs-grid">
                {TABS.map((tab) => 
                    <div 
                        key = {tab.id}
                        // TODO: className="change color based on isActive or not"
                        title = {tab.label} // display on mouseover
                    />
                )}
            </div>
        </div>  
    );
};

export default InterfaceTabs;
