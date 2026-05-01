package com.example.reactive_roots.controllers;

import com.example.reactive_roots.dto.LoginRequestDTO;
import com.example.reactive_roots.dto.PlayerSessionDTO;
import com.example.reactive_roots.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// allow access to React
@CrossOrigin(origins = "*") // allow access to all origins
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    // register new user
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody LoginRequestDTO registrationDto) {
        userService.register(registrationDto);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User created successfully!");
        return ResponseEntity.ok(response);
    }

    // verify authentication and log in
    @PostMapping("/login")
    public ResponseEntity<PlayerSessionDTO> login(@RequestBody LoginRequestDTO dto) {
        // authenticate
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.username(), dto.password())
        );

        // fetch session data
        PlayerSessionDTO session = userService.getPlayerSession(dto.username());

        return ResponseEntity.ok(session);
    }
}
