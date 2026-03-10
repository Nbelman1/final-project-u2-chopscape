package com.example.reactive_roots.dto;

public class InventoryItemDTO {
    private String itemName;
    private Integer quantity;
    private Integer slotPosition;

    public InventoryItemDTO() {
    }

    public InventoryItemDTO(String itemName, Integer quantity, Integer slotPosition) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.slotPosition = slotPosition;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getSlotPosition() {
        return slotPosition;
    }

    public void setSlotPosition(int slotPosition) {
        this.slotPosition = slotPosition;
    }
}
