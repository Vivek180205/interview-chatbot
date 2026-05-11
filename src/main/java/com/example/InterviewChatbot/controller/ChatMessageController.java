package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.ChatMessageRequest;
import com.example.InterviewChatbot.models.ChatMessage;
import com.example.InterviewChatbot.service.ChatMessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/interview")
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }
    @PostMapping("/message")
    public ResponseEntity<?> saveMessage(@Valid @RequestBody ChatMessageRequest req){

        chatMessageService.saveMessage(req);
        return ResponseEntity.ok("Message Saved");
    }

    @GetMapping("/messages/{sessionId}")
    public ResponseEntity<List<ChatMessage>> getMessages(
            @PathVariable int sessionId
    ){

        return ResponseEntity.ok(
                chatMessageService.fetchSessionMessage(sessionId)
        );
    }

}
