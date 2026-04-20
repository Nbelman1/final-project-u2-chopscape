package com.example.reactive_roots.controllers;

import com.example.reactive_roots.dto.UserProfileDTO;
import com.example.reactive_roots.models.InventoryItem;
import com.example.reactive_roots.models.PlayerStat;
import com.example.reactive_roots.models.User;
import com.example.reactive_roots.repositories.PlayerStatRepository;
import com.example.reactive_roots.repositories.UserRepository;
import com.example.reactive_roots.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // allow access to all origins
public class UserController {

    UserRepository repository;
    UserService userService;

    public UserController (UserRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    // auth - check if username exists
    @GetMapping("/exists/{username}")
    public ResponseEntity<Boolean> checkUsername(@PathVariable String username) {
        return ResponseEntity.ok(repository.existsByUsername(username));
    }

    // get user profile, for settings screen
    @GetMapping("/profile/{username}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable String username) {
        UserProfileDTO profile = userService.getUserProfile(username);
        return ResponseEntity.ok(profile);
    }

    // delete user (account deletion)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        }
        return ResponseEntity.notFound().build(); // 404
    }

}
