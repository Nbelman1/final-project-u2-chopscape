package com.example.reactive_roots.repositories;

import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Integer> {
    List<InventoryItem> findByUserId(int userId);
    @Modifying
    @Transactional
    List<InventoryItem> deleteByUser(User user);
    List<InventoryItem> findAllByUserId(Integer userId);
}
