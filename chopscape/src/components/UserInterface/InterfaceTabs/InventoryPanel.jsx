import { LOGS } from "../../../data/logs";

const InventoryPanel = ({ inventory, onDropItem }) => {
    return (
        <div className="inventory-grid">
            {inventory.map((item, index) => {
                // check if slot has an item in it; add name if it does
                const logData = item && item.name ? 
                    LOGS.find(el => el.logType === item.name) 
                    : null;

                return (
                    <div key={index} className="inventory-slot">
                    {item && logData ? (
                        <>
                            <img 
                                src={logData?.logImagePath}
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
