package com.example.reactive_roots.services;

import com.example.reactive_roots.dto.InventoryItemDTO;
import com.example.reactive_roots.dto.LoginRequestDTO;
import com.example.reactive_roots.dto.PlayerSessionDTO;
import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.models.PlayerStat;
import com.example.reactive_roots.models.User;
import com.example.reactive_roots.repositories.InventoryItemRepository;
import com.example.reactive_roots.repositories.PlayerStatRepository;
import com.example.reactive_roots.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PlayerStatRepository playerStatRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PlayerStatRepository playerStatRepository, InventoryItemRepository inventoryItemRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.playerStatRepository = playerStatRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(LoginRequestDTO dto) {
        User newUser = new User();
        newUser.setUsername(dto.username());
        String hashedSafePassword = passwordEncoder.encode(dto.password());
        newUser.setPassword(hashedSafePassword);
        newUser.setDateCreated(LocalDate.now());
        userRepository.save(newUser);
    }

    @Transactional // these methods must execute at the same time
    public void saveSession(int userId, PlayerSessionDTO dto) {
        // fetch User object
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // clear old inventory
        inventoryItemRepository.deleteByUser(user);

        // update player stats
        PlayerStat stats = playerStatRepository.findByUser(userId);
        stats.setExpWoodcutting(dto.getExpWoodcutting());
        playerStatRepository.save(stats);

        // update inventoryItems on logout
        for (InventoryItemDTO itemDto : dto.getInventory()) {
            InventoryItem itemEntity = new InventoryItem();
            itemEntity.setUser(user);
            itemEntity.setItemName(itemDto.getItemName());
            itemEntity.setQuantity(itemDto.getQuantity());
            inventoryItemRepository.save(itemEntity);
        }
    }
}
