package com.example.InterviewChatbot.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {

    BACKEND_DEV("Backend Developer"),
    FRONTEND_DEV("Frontend Developer"),
    FULLSTACK_DEV("Full Stack Developer"),
    DATA_SCIENTIST("Data Scientist"),
    PYTHON_DEV("Python Developer"),
    JAVA_DEV("Java Developer");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    //  frontend ko readable naam dene ke liye
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    //  frontend se aane wali value handle karne ke liye
    @JsonCreator
    public static Role fromValue(String value) {
        for (Role role : Role.values()) {
            if (role.name().equalsIgnoreCase(value) ||
                    role.displayName.equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + value);
    }
}