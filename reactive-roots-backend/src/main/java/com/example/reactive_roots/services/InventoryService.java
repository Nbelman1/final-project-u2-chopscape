package com.example.reactive_roots.services;

import com.example.reactive_roots.dto.InventoryItemDTO;
import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.models.User;
import com.example.reactive_roots.repositories.InventoryItemRepository;
import com.example.reactive_roots.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private InventoryItemRepository inventoryItemRepository;
    private UserRepository userRepository;

    public InventoryService(InventoryItemRepository inventoryItemRepository, UserRepository userRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
        this.userRepository = userRepository;
    }

    public List<InventoryItemDTO> getInventoryByUserId(int userId) {
        List<InventoryItem> items = inventoryItemRepository.findByUserId(userId);

        return items.stream().map(item -> new InventoryItemDTO(
                item.getItemName(),
                item.getId(),
                item.getQuantity()
        )).collect(Collectors.toList());
    }

    // for testing
    public InventoryItem saveItemForUser(int userId, InventoryItem item) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with ID " + userId + " not found"));
        item.setUser(user);
        return inventoryItemRepository.save(item);
    }
}
