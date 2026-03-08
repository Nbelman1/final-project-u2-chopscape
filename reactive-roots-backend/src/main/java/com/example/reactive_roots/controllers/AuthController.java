package com.example.reactive_roots.controllers;

import com.example.reactive_roots.dto.LoginRequestDTO;
import com.example.reactive_roots.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    // register new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody LoginRequestDTO registrationDto) {
        userService.register(registrationDto);
        return ResponseEntity.ok("User created successfully!");
    }

    // verify authentication and log in
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        Authentication authRequest = UsernamePasswordAuthenticationToken
                .unauthenticated(loginRequest.username(), loginRequest.password()); // 401

        Authentication authResult = authenticationManager.authenticate(authRequest);

        return ResponseEntity.ok("Login successful!");
    }
}
