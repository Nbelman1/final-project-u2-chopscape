package com.example.reactive_roots.services;

import com.example.reactive_roots.dto.*;
import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.models.PlayerStat;
import com.example.reactive_roots.models.User;
import com.example.reactive_roots.repositories.InventoryItemRepository;
import com.example.reactive_roots.repositories.LevelRequirementRepository;
import com.example.reactive_roots.repositories.PlayerStatRepository;
import com.example.reactive_roots.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PlayerStatRepository playerStatRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final LevelRequirementRepository levelRequirementRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PlayerStatRepository playerStatRepository, InventoryItemRepository inventoryItemRepository, LevelRequirementRepository levelRequirementRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.playerStatRepository = playerStatRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.levelRequirementRepository = levelRequirementRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<LevelTableDTO> getLevelTable() {
        return levelRequirementRepository.findAll().stream()
                .map(entity -> new LevelTableDTO(entity.getLevel(), entity.getExpRequired()))
                .toList();
    }

    public PlayerSessionDTO getPlayerSession(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PlayerStat stats = playerStatRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Stats not found"));

        List<InventoryItem> itemEntities = inventoryItemRepository.findAllByUserId(user.getId());

        List<InventoryItemDTO> itemDtos = itemEntities.stream()
                .map(entity -> new InventoryItemDTO(
                        entity.getItemName(),
                        entity.getQuantity(),
                        entity.getSlotPosition()
                        ))
                .toList();

        return new PlayerSessionDTO(
                user.getId(),
                stats.getExpWoodcutting(),
                stats.getLevelWoodcutting(),
                itemDtos
        );
    }

    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PlayerStat stats = playerStatRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Stats not found for user: " + username));

        return new UserProfileDTO(
                user.getUsername(),
                stats.getExpWoodcutting(),
                stats.getLevelWoodcutting(),
                user.getDateCreated()
        );
    }

    // register new user
    public void register(LoginRequestDTO dto) {
        // create new user
        User newUser = new User();
        newUser.setUsername(dto.username());
        String hashedSafePassword = passwordEncoder.encode(dto.password());
        newUser.setPassword(hashedSafePassword);
        newUser.setDateCreated(LocalDate.now());
        // save new user
        User savedUser = userRepository.save(newUser);
        // create initial stats
        PlayerStat initialStats = new PlayerStat();
        initialStats.setUser(savedUser);
        initialStats.setExpWoodcutting(0);
        initialStats.setLevelWoodcutting(1);
        playerStatRepository.save(initialStats);
    }

}
