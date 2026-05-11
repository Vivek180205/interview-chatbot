package com.example.InterviewChatbot.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InterviewSessionRequest {
    @NotNull
    private Double avgScore;
    @NotBlank(message = "userId required.")
    private int userId;
    @NotBlank(message = "category have to be filled.")
    private String category;
}
