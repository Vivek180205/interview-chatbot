package com.example.InterviewChatbot.dao;

import com.example.InterviewChatbot.models.InterviewSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class InterviewSessionDao {
    private final JdbcTemplate jdbcTemplate;

    public InterviewSessionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Value("${session.query.store}")
    private String sessionStoreQuery;

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

            return ps;

        }, keyHolder);

        return keyHolder.getKey().intValue();
    }


    public void updateAverageScore(int sessionId, Double avgScore){

        String query = """
        UPDATE interview_sessions
        SET average_score = ?
        WHERE id = ?
        """;

        jdbcTemplate.update(query, avgScore, sessionId);
    }
}
