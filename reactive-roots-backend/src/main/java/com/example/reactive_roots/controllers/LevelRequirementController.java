package com.example.reactive_roots.controllers;

import com.example.reactive_roots.models.LevelRequirement;
import com.example.reactive_roots.repositories.LevelRequirementRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/levels")
@CrossOrigin(origins = "*") // allow access to all origins
public class LevelRequirementController {

    LevelRequirementRepository repository;

    public LevelRequirementController(LevelRequirementRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<LevelRequirement> getAllLevels() {
        return repository.findAll();
    }
}
