package com.example.reactive_roots.models;

import jakarta.persistence.*;

@Entity
@Table(name = "level_requirements")
public class LevelRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int level;

    private int expRequired;

    public LevelRequirement() {
    }

    public LevelRequirement(int id, int level, int expRequired) {
        this.id = id;
        this.level = level;
        this.expRequired = expRequired;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getExpRequired() {
        return expRequired;
    }

    public void setExpRequired(int expRequired) {
        this.expRequired = expRequired;
    }

}
