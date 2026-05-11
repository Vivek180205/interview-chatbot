package com.example.InterviewChatbot.dao;

import com.example.InterviewChatbot.models.ChatMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChatMessageDao {
    private final JdbcTemplate jdbcTemplate;

    public ChatMessageDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Value("${chat.query.store}")
    private String chatStoreQuery;

    @Value("${chat.query.fetch}")
    private String chatFetchQuery;

    @Value("${session.query.getAvgScore}")
    private String getSessionStoreQuery;

    public void saveMessage(ChatMessage c) {
        jdbcTemplate.update(chatStoreQuery,
                c.getSessionId(),
                c.getSender(),
                c.getMessage(),
                c.getScore());
    }

    public List<ChatMessage> getMessageBySessionId(int sessionId) {
        return jdbcTemplate.query(chatFetchQuery,
                new Object[]{sessionId},
                (rs, rowNum) -> {

                    ChatMessage msg = new ChatMessage();

                    msg.setId(rs.getInt("id"));
                    msg.setSessionId(rs.getInt("session_id"));
                    msg.setSender(rs.getString("sender"));
                    msg.setMessage(rs.getString("message"));
                    msg.setScore(rs.getDouble("score"));
                    msg.setCreatedAt(rs.getTimestamp("created_at"));

                    return msg;
                });
    }

    public Double getAverageScoreBySessionId(int sessionId){

        return jdbcTemplate.queryForObject(
                getSessionStoreQuery,
                Double.class,
                sessionId
        );
    }
}
