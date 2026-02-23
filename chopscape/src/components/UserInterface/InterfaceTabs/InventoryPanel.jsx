// right now all identical items stack on one inventory slot
// max number of stacked items = 28
// can unstack later when I incorporate drag and drop 

const invItems = [];

const InventoryPanel = ({ inventory, onDropItem, LOGS }) => {
    return (
        <div className="inventory-grid">
            {inventory.map((item, index) => {
                // check if slot has an item in it; add name if it does
                const logData = item ? LOGS.find(el => el.logType === item.name) : null;

                return (
                    <div key={index} className="inventory-slot">
                    {item ? (
                        <>
                            <img 
                                src={logData?.imagePath}
                                alt={item.name}
                                className="inventory-icon"
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    onDropItem(index);
                                }}
                        />
                        <button className="mobile-drop" onClick={() => onDropItem(index)}>x</button>
                        </>
                    ) : null}
                    </div>
                );
            })}
            
        </div>
    );
};

export default InventoryPanel;
