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
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    UserRepository repository;
    UserService userService;

    public UserController (UserRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    @GetMapping("/exists/{username}")
    public ResponseEntity<Boolean> checkUsername(@PathVariable String username) {
        return ResponseEntity.ok(repository.existsByUsername(username));
    }

    // fetch list of all users
    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(repository.findAll());
    }

    // fetch info for one user
    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build()); // 404
    }

    // get user profile, for settings screen
    @GetMapping("/profile/{username}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable String username) {
        UserProfileDTO profile = userService.getUserProfile(username);
        return ResponseEntity.ok(profile);
    }

    // add new user
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = repository.save(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED); // 201
    }

    // edit username
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        return repository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(updatedUser.getUsername());
                    return ResponseEntity.ok(repository.save(existingUser));
                })
                .orElse(ResponseEntity.notFound().build()); // 404
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
