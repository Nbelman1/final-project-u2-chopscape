package com.example.reactive_roots.controllers;

import com.example.reactive_roots.dto.PlayerSessionDTO;
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
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerStatController {

    private final PlayerStatRepository repository;
    private final PlayerService playerService;

    public PlayerStatController (PlayerStatRepository repository, PlayerService playerService) {
        this.repository = repository;
        this.playerService = playerService;
    }

    // update stats and inventory (auto-save and save on logout)
    @PutMapping("/{userId}/sync")
    public ResponseEntity<String> syncPlayerState(
            @PathVariable int userId,
            @RequestBody PlayerSessionDTO sessionData
            ) {
        playerService.savePlayerProgress(userId, sessionData);
        return ResponseEntity.ok("Progress synced successfully for user " + userId);
    }

    // get profile stats for settings screen
    @GetMapping("/{username}/stats")
    public ResponseEntity<UserProfileDTO> getPlayerStats(@PathVariable String username) {
        UserProfileDTO stats = playerService.getPlayerProfile(username);

        return ResponseEntity.ok(stats);
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
