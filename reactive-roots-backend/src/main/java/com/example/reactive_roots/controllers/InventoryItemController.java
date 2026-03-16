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

}
