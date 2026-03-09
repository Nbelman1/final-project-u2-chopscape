package com.example.reactive_roots.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private String itemName;

    private Integer quantity;

    private Integer slotPosition;

    public InventoryItem() {
    }

    public InventoryItem(Integer id, User user, String itemName, Integer quantity, Integer slotPosition) {
        this.id = id;
        this.user = user;
        this.itemName = itemName;
        this.quantity = quantity;
        this.slotPosition = slotPosition;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getSlotPosition() {
        return slotPosition;
    }

    public void setSlotPosition(Integer slotPosition) {
        this.slotPosition = slotPosition;
    }

    @Override
    public String toString() {
        return "InventoryItem{" +
                "id=" + id +
                ", user=" + user +
                ", itemName='" + itemName + '\'' +
                ", quantity=" + quantity +
                ", slotPosition=" + slotPosition +
                '}';
    }
}
