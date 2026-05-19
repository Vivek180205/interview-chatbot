package com.example.InterviewChatbot.dao;

import com.example.InterviewChatbot.models.InterviewSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class InterviewSessionDao {
    private final JdbcTemplate jdbcTemplate;

    public InterviewSessionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Value("${session.query.store}")
    private String sessionStoreQuery;
    @Value("${session.query.completed}")
    private String completeSessionQuery;

    public Integer saveSession(InterviewSession session){
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {

            PreparedStatement ps = connection.prepareStatement(
                    sessionStoreQuery,
                    new String[]{"id"}
            );

            ps.setInt(1, session.getUserId());
            ps.setString(2, session.getCategory());
            ps.setDouble(3, session.getAvgScore());
            ps.setBoolean(4, session.getCompleted());

            ps.setTimestamp(
                    5,
                    Timestamp.valueOf(session.getCreatedAt())
            );
            return ps;

        }, keyHolder);

        return keyHolder.getKey().intValue();
    }

    public void completeSession(int sessionId, Double avgScore,boolean completed, LocalDateTime endedAt ){
        jdbcTemplate.update(
                completeSessionQuery,
                avgScore,
                completed,
                Timestamp.valueOf(endedAt),
                sessionId
        );
    }


    public List<InterviewSession> getSessionsByUserId(int userId) {

        String sql = """
        SELECT *
        FROM interview_sessions
        WHERE user_id = ?
        ORDER BY id DESC
    """;

        return jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(InterviewSession.class),
                userId
        );
    }
}
