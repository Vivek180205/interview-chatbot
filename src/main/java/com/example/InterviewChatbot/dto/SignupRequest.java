package com.example.InterviewChatbot.dto;

import com.example.InterviewChatbot.models.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SignupRequest {

    @NotBlank(message = "Username required")
    private String username;

    @NotBlank(message = "Email required")
    private String email;

    @NotBlank(message = "Password required")
    private String password;

    @NotNull(message = "Role required")
    private Role role;

    @NotBlank(message = "Experience required")
    private String experience;
}