package com.example.InterviewChatbot.service;

import com.example.InterviewChatbot.dao.ChatMessageDao;
import com.example.InterviewChatbot.dto.ChatMessageRequest;
import com.example.InterviewChatbot.models.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageDao chatMessageDao;

    public ChatMessageService(ChatMessageDao chatMessageDao) {
        this.chatMessageDao = chatMessageDao;
    }

    public void saveMessage(ChatMessageRequest req){
        ChatMessage msg = new ChatMessage();

        msg.setSessionId(req.getSessionId());
        msg.setSender(req.getSender());
        msg.setMessage(req.getMessage());
        msg.setScore(req.getScore());

        chatMessageDao.saveMessage(msg);

    }

    public List<ChatMessage> fetchSessionMessage(int sessionId) {
        return chatMessageDao.getMessageBySessionId(sessionId);
    }
}
