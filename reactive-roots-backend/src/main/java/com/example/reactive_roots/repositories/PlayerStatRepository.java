package com.example.reactive_roots.repositories;

import com.example.reactive_roots.models.PlayerStat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerStatRepository extends JpaRepository<PlayerStat, Integer> {
    Optional<PlayerStat> findByUserId(int id); // handle missing value if player does not have stats yet
}
