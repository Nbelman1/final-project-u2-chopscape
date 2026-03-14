import { LOGS } from "../../../data/logs";

// TODO: fix drop function

const InventoryPanel = ({ stats, onDropItem }) => {

    const inventory = stats.inventory;

    return (
        <div className="inventory-grid">
            {inventory.map((item, index) => {
                console.log("slot item:", item);

                // if slot has an item in it, name the item
                const logData = item && item.itemName ? 
                    LOGS.find(el => el.logType === item.itemName) 
                    : null;

                console.log("stats.inventory", stats.inventory);

                return (
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
