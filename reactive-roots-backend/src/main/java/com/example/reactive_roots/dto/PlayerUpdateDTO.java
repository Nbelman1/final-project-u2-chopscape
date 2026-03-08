package com.example.reactive_roots.dto;

import com.example.reactive_roots.models.InventoryItem;

import java.util.List;

public class PlayerUpdateDTO {
    private int expWoodcutting;
    private int levelWoodcutting;
    private List<InventoryItem> inventory;

    public PlayerUpdateDTO() {
    }

    public PlayerUpdateDTO(int expWoodcutting, int levelWoodcutting, List<InventoryItem> inventory) {
        this.expWoodcutting = expWoodcutting;
        this.levelWoodcutting = levelWoodcutting;
        this.inventory = inventory;
    }

    public int getExpWoodcutting() {
        return expWoodcutting;
    }

    public void setExpWoodcutting(int expWoodcutting) {
        this.expWoodcutting = expWoodcutting;
    }

    public int getLevelWoodcutting() {
        return levelWoodcutting;
    }

    public void setLevelWoodcutting(int levelWoodcutting) {
        this.levelWoodcutting = levelWoodcutting;
    }

    public List<InventoryItem> getInventory() {
        return inventory;
    }

    public void setInventory(List<InventoryItem> inventory) {
        this.inventory = inventory;
    }
}
