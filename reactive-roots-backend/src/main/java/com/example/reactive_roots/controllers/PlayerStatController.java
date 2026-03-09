package com.example.reactive_roots.controllers;

import com.example.reactive_roots.dto.UserProfileDTO;
import com.example.reactive_roots.models.PlayerStat;
import com.example.reactive_roots.repositories.PlayerStatRepository;
import com.example.reactive_roots.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class PlayerStatController {

    private final PlayerStatRepository repository;
    private final PlayerService playerService;

    public PlayerStatController (PlayerStatRepository repository, PlayerService playerService) {
        this.repository = repository;
        this.playerService = playerService;
    }

    // get woodcutting stats
    @GetMapping("/{username}/stats")
    public ResponseEntity<UserProfileDTO> getWoodcuttingStats(@PathVariable String username) {
        UserProfileDTO stats = playerService.getPlayerProfile(username);

        return ResponseEntity.ok(stats);
    }

    // fetch stats for all players
    @GetMapping()
    public ResponseEntity<List<PlayerStat>> getAllPlayerStats() {
        return ResponseEntity.ok(repository.findAll());
    }

    // fetch a specific player's stats (settings screen)
    @GetMapping("{id}")
    public ResponseEntity<PlayerStat>  getPlayerStatsById(@PathVariable int id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build()); // 404
    }

    // create stats for new player (account creation)
    @PostMapping
    public PlayerStat create(@RequestBody PlayerStat newStat) {
        return repository.save(newStat);
    }

    // update stats for a player (auto-save and logout)
    @PutMapping("/{id}")
    public ResponseEntity<PlayerStat> updateStatsByPlayer(@PathVariable int id, @RequestBody PlayerStat updatedStat) {
        return repository.findById(id)
                .map(existingStat -> {
                    existingStat.setExpWoodcutting(updatedStat.getExpWoodcutting());
                    existingStat.setLevelWoodcutting((updatedStat.getLevelWoodcutting()));
                    return ResponseEntity.ok(repository.save(existingStat));
                })
                .orElse(ResponseEntity.notFound().build()); // 404
    }

    // delete player's stats (account deletion)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatsByPlayer(@PathVariable int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 if success
        }
        return ResponseEntity.notFound().build(); // 404
    }

}
