package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.AnswerRequest;
import com.example.InterviewChatbot.service.AiService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/test")
    public ResponseEntity<String> evaluate(
            @RequestBody AnswerRequest request
    ) {

        String prompt = """
Evaluate the candidate's answer.

Question:
%s
    
Candidate Answer:
%s

STRICT OUTPUT FORMAT:

Score: <0-10>
Feedback: <concise constructive feedback>

Rules:
- ALWAYS include BOTH Score and Feedback
- Score MUST be integer 0-10
- Judge relative to the question
- No JSON
- No markdown
- No extra text
"""
                .formatted(
                        request.getQuestion(),
                        request.getAnswer()
                );
        return ResponseEntity.ok(
                aiService.getResponse(prompt)
        );
    }
}