package com.example.reactive_roots.services;

import com.example.reactive_roots.dto.InventoryItemDTO;
import com.example.reactive_roots.dto.PlayerSessionDTO;
import com.example.reactive_roots.dto.UserProfileDTO;
import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.models.PlayerStat;
import com.example.reactive_roots.repositories.InventoryItemRepository;
import com.example.reactive_roots.repositories.PlayerStatRepository;
import com.example.reactive_roots.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerStatRepository playerStatRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final UserRepository userRepository;

    public PlayerService(PlayerStatRepository playerStatRepository, InventoryItemRepository inventoryItemRepository, UserRepository userRepository) {
        this.playerStatRepository = playerStatRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.userRepository = userRepository;
    }

    public UserProfileDTO getPlayerProfile(String username) {
        PlayerStat entity = playerStatRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Player not found"));

        return new UserProfileDTO(
                entity.getUser().getUsername(),
                entity.getExpWoodcutting(),
                entity.getLevelWoodcutting(),
                entity.getUser().getDateCreated()
        );
    }

    // map through inventory items belonging to user with userId, return List with itemName, quantity, slotPosition
    public PlayerSessionDTO getSessionData(int userId) {
        PlayerStat stats = playerStatRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<InventoryItem> items = inventoryItemRepository.findByUserId(userId);

        List<InventoryItemDTO> itemDTOs = items.stream().map(item -> {
            InventoryItemDTO dto = new InventoryItemDTO();
            dto.setItemName(item.getItemName());
            dto.setQuantity(item.getQuantity());
            dto.setSlotPosition(item.getSlotPosition());
            return dto;
        }).toList();

        return new PlayerSessionDTO(userId, stats.getExpWoodcutting(), stats.getLevelWoodcutting(), itemDTOs);
    }
}
