package com.example.reactive_roots.dto;

import java.time.LocalDate;
import java.util.Date;

public class UserProfileDTO {
    private String username;
    private int expWoodcutting;
    private int levelWoodcutting;
    private LocalDate dateCreated;

    public UserProfileDTO() {
    }

    public UserProfileDTO(String username, int expWoodcutting, int levelWoodcutting, LocalDate dateCreated) {
        this.username = username;
        this.expWoodcutting = expWoodcutting;
        this.levelWoodcutting = levelWoodcutting;
        this.dateCreated = dateCreated;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getExpWoodcutting() {
        return expWoodcutting;
    }

    public void setExpWoodcutting(int expWoodcutting) {
        this.expWoodcutting = expWoodcutting;
    }

    public int getLevelWoodcutting() {
        return levelWoodcutting;
    }

    public void setLevelWoodcutting(int levelWoodcutting) {
        this.levelWoodcutting = levelWoodcutting;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }
}
