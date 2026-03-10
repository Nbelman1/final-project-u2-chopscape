package com.example.reactive_roots.controllers;

import com.example.reactive_roots.dto.InventoryItemDTO;
import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.repositories.InventoryItemRepository;
import com.example.reactive_roots.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryItemController {

    private final InventoryItemRepository repository;
    private final InventoryService inventoryService;

    public InventoryItemController(InventoryItemRepository repository, InventoryService inventoryService) {
        this.repository = repository;
        this.inventoryService = inventoryService;
    }

    // fetch inventory items to render inventory tab
    @GetMapping("/{userId}")
    public ResponseEntity<List<InventoryItemDTO>> getPlayerInventory(@PathVariable int userId) {
        List<InventoryItemDTO> inventory = inventoryService.getInventoryByUserId(userId);
        return ResponseEntity.ok(inventory);
    }

    // get all items
    @GetMapping("/items")
    public ResponseEntity<List<InventoryItem>> getAllItems() {
        return ResponseEntity.ok(repository.findAll()); // 200
    }

    // get an item
    @GetMapping("items/{id}")
    public ResponseEntity<InventoryItem> getItemById(@PathVariable int id) throws NoResourceFoundException {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new NoResourceFoundException(HttpMethod.GET, "/game/" + id, null));
    }

    // add new item
    @PostMapping("/{userId}")
    public ResponseEntity<InventoryItem> addItem(@PathVariable int userId, @RequestBody InventoryItem newItem) {
        return ResponseEntity.ok(inventoryService.saveItemForUser(userId, newItem));
    }

    // edit existing item
    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> updateItemQuantity(@PathVariable int id, @RequestBody InventoryItem details) {
        return repository.findById(id)
                .map(item -> {
                    item.setQuantity(details.getQuantity());
                    return ResponseEntity.ok(repository.save(item));
                })
                .orElse(ResponseEntity.notFound().build()); // 404
    }

    // delete existing item
//    TODO: not sending user.id to table
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 if successful
        }
        return ResponseEntity.notFound().build(); // 404 if missing
    }
}
