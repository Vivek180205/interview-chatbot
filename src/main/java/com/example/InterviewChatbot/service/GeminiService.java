package com.example.InterviewChatbot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.List;

@Service
public class GeminiService implements AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getResponse(String prompt) {

        try {

            String url = apiUrl + "?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", prompt)
                                    )
                            )
                    )
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(url, request, Map.class);

            List candidates = (List) response.getBody().get("candidates");
            Map candidate = (Map) candidates.get(0);

            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");

            Map firstPart = (Map) parts.get(0);

            String aiText = firstPart.get("text").toString();

            if (prompt.contains("Evaluate") && !aiText.matches("(?is).*Score:.*")) {
                aiText = "Score: 5\nFeedback: " + aiText;
            }

            return aiText;

        } catch(Exception e){
            e.printStackTrace();
            return
                    "Score: 0\n" +
                            "Feedback: AI service unavailable. Please retry.";
        }
    }
}