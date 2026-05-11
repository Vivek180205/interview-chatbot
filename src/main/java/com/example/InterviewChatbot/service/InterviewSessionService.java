package com.example.InterviewChatbot.service;

import com.example.InterviewChatbot.dao.ChatMessageDao;
import com.example.InterviewChatbot.dao.InterviewSessionDao;
import com.example.InterviewChatbot.dto.InterviewSessionRequest;
import com.example.InterviewChatbot.models.InterviewSession;
import org.springframework.stereotype.Service;

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

        Integer generatedId = sessionDao.saveSession(session);

        session.setId(generatedId);

        return session;
    }

    public void completeSession(int sessionId){
        Double avgScore = chatMessageDao.getAverageScoreBySessionId(sessionId);

        if(avgScore == null){
            avgScore = 0.0;
        }

        sessionDao.updateAverageScore(sessionId, avgScore);
    }
}
