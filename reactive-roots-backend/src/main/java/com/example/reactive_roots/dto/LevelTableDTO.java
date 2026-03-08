package com.example.reactive_roots.dto;

public class LevelTableDTO {
    private int level;
    private int expRequired;

    public LevelTableDTO() {
    }

    public LevelTableDTO(int level, int expRequired) {
        this.level = level;
        this.expRequired = expRequired;
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
