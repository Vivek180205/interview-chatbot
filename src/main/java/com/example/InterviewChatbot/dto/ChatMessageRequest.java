package com.example.InterviewChatbot.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChatMessageRequest {

    @NotNull
    private Integer sessionId;

    @NotBlank(message = "Sender required")
    private String sender;

    @NotBlank(message = "Message cannot be empty")
    private String message;

    private Double score;
}