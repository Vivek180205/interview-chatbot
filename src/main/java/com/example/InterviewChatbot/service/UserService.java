package com.example.InterviewChatbot.service;

import com.example.InterviewChatbot.dao.UserDao;
import com.example.InterviewChatbot.dto.SignupRequest;
import com.example.InterviewChatbot.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(SignupRequest req){

        User user = new User();

        user.setName(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setTarget_role(req.getRole().name());
        user.setExperience_level(req.getExperience());

        userDao.saveUser(user);
    }

    public User login(String email, String password) {
        User user = userDao.fetchUserByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}
