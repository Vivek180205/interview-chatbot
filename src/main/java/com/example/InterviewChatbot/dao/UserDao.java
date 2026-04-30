package com.example.InterviewChatbot.dao;

import com.example.InterviewChatbot.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {
    private final JdbcTemplate jdbcTemplate ;

    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Value("${user.query.Login}")
    private String loginQuery;

    @Value("${user.query.SignUp}")
    private String signupQuery;

    public void saveUser(User u){           // for SignUP
        jdbcTemplate.update(signupQuery,
                u.getName(),
                u.getEmail(),
                u.getPassword(),
                u.getTarget_role(),
                u.getExperience_level()
        );
    }

    public User fetchUserByEmail(String email) {               // for SignIn
        try {
            return jdbcTemplate.queryForObject(loginQuery, new Object[]{email},
                    (rs,num)->{
                        User user = new User();
                        user.setId(rs.getInt("id"));
                        user.setName(rs.getString("name"));
                        user.setEmail(rs.getString("email"));
                        user.setPassword(rs.getString("password"));
                        user.setTarget_role(rs.getString("target_role"));
                        user.setExperience_level(rs.getString("experience_level"));
                        user.setCreated_at(rs.getDate("created_at"));
                        return user;
                    }
            );
        }catch (Exception e){
            return null;
        }
    }
}
