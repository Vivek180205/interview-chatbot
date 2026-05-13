package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.InterviewSessionRequest;
import com.example.InterviewChatbot.models.InterviewSession;
import com.example.InterviewChatbot.service.InterviewSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewSessionController {
    private final InterviewSessionService sessionService;

    public InterviewSessionController(InterviewSessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/session")
    public ResponseEntity<?> saveSession(@RequestBody InterviewSessionRequest session){
        InterviewSession savedSession = sessionService.saveSession(session);
        return ResponseEntity.ok(savedSession);
    }

    @PutMapping("/session/{id}")
    public ResponseEntity<?> completeSession( @PathVariable int id){
        sessionService.completeSession(id);
        return ResponseEntity.ok("Session completed");
    }

    @GetMapping("/api/interviews/user")
    public ResponseEntity<?> getAllSessions(
            @RequestParam int userId
    ) {
        return ResponseEntity.ok(
                sessionService.getAllSessions(userId)
        );
    }
}
