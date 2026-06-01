package com.example.InterviewChatbot.dto;

import java.util.List;
import java.util.Map;

public class SummaryRequest {

    private String category;
    private List<Map<String,Object>> messages;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Map<String,Object>> getMessages() {
        return messages;
    }

    public void setMessages(
            List<Map<String,Object>> messages
    ) {
        this.messages = messages;
    }
}
