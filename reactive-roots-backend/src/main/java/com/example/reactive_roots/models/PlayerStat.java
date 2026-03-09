package com.example.reactive_roots.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "player_stats")
public class PlayerStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private int expWoodcutting;

    private int levelWoodcutting;

    public PlayerStat() {
    }

    public PlayerStat(Integer id, User user, int expWoodcutting, int levelWoodcutting) {
        this.id = id;
        this.user = user;
        this.expWoodcutting = expWoodcutting;
        this.levelWoodcutting = levelWoodcutting;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    @Override
    public String toString() {
        return "PlayerStat{" +
                "id=" + id +
                ", userId=" + user +
                ", expWoodcutting=" + expWoodcutting +
                ", levelWoodcutting=" + levelWoodcutting +
                '}';
    }
}
