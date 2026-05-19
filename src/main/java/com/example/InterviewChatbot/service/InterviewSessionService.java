package com.example.InterviewChatbot.service;

import com.example.InterviewChatbot.dao.ChatMessageDao;
import com.example.InterviewChatbot.dao.InterviewSessionDao;
import com.example.InterviewChatbot.dto.InterviewSessionRequest;
import com.example.InterviewChatbot.models.InterviewSession;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InterviewSessionService {
    private final InterviewSessionDao sessionDao;
    private final ChatMessageDao chatMessageDao;

    public InterviewSessionService(InterviewSessionDao sessionDao, ChatMessageDao chatMessageDao) {
        this.sessionDao = sessionDao;
        this.chatMessageDao = chatMessageDao;
    }

    public InterviewSession saveSession(InterviewSessionRequest req){

        InterviewSession session = new InterviewSession();

        session.setUserId(req.getUserId());
        session.setCategory(req.getCategory());
        session.setAvgScore(0.0);
        session.setCompleted(false);
        session.setCreatedAt(LocalDateTime.now());

        Integer generatedId = sessionDao.saveSession(session);
        session.setId(generatedId);

        return session;
    }

    public void completeSession(int sessionId){
        Double avgScore = chatMessageDao.getAverageScoreBySessionId(sessionId);

        if(avgScore == null){
            avgScore = 0.0;
        }

        sessionDao.completeSession(sessionId, avgScore,true, LocalDateTime.now());
    }

    public List<InterviewSession> getAllSessions(int userId) {
        return sessionDao.getSessionsByUserId(userId);
    }
}
