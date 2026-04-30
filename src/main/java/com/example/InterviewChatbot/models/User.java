package com.example.InterviewChatbot.models;

import org.springframework.context.annotation.Bean;

import java.util.Date;

public class User {
    private int id;
    private String name;
    private String email;
    private String password;
    private String target_role;
    private String experience_level;
    private Date created_at;

    public String getTarget_role() {
        return target_role;
    }

    public void setTarget_role(String target_role) {
        this.target_role = target_role;
    }

    public String getExperience_level() {
        return experience_level;
    }

    public void setExperience_level(String experience_level) {
        this.experience_level = experience_level;
    }

    public User() {}
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
