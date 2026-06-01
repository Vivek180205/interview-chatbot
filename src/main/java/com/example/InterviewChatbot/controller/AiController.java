package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.AnswerRequest;
import com.example.InterviewChatbot.dto.SummaryRequest;
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
You are a professional technical interviewer.
Evaluate the candidate's answer relative to the interview question.

STRICT OUTPUT FORMAT:

Score: <0-10>
Feedback: <2-3 sentence constructive evaluation>

Rules:
- ALWAYS include BOTH Score and Feedback
- Score MUST be an integer 0-10
- Judge correctness relative to the question
- No JSON
- No markdown
- No extra text

Question:
%s
Candidate Answer:
%s
"""
                .formatted(
                        request.getQuestion(),
                        request.getAnswer()
                );
        return ResponseEntity.ok(
                aiService.getResponse(prompt)
        );
    }

    @PostMapping("/summary")
    public ResponseEntity<String> generateSummary(
            @RequestBody SummaryRequest request
    ){

        String prompt = """
You are a professional technical interviewer.
DO NOT return Score or Feedback labels.
Return EXACTLY:

Strengths:
- point 1
- point 2

Weaknesses:
- point 1
- point 2

Study Plan:
- recommendation 1
- recommendation 2

Category:
%s
Interview Messages:
%s
""".formatted(
                request.getCategory(),
                request.getMessages()
        );

        return ResponseEntity.ok(
                aiService.getResponse(prompt)
        );
    }
}