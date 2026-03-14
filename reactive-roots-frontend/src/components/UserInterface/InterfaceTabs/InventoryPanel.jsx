import { LOGS } from "../../../data/logs";

// TODO: fix drop function

const InventoryPanel = ({ stats, onDropItem }) => {

    const inventory = stats.inventory;

    return (
        <div className="inventory-grid">
            {inventory.map((item, index) => {

                // if slot has an item in it, name the item
                const logData = item && item.itemName ? 
                    LOGS.find(el => el.logType === item.itemName) 
                    : null;

                return (
                    // if slot has an item, render item image 
                    <div key={index} className="inventory-slot">
                    {item && logData ? (
                        <>
                            <img 
                                src={logData.logImagePath}
                                alt={item.itemName}
                                className="inventory-icon"
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    onDropItem(index);
                                }}
                        />
                        {/* delete item on click */}
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
