package com.example.InterviewChatbot.service;

import com.example.InterviewChatbot.dao.UserDao;
import com.example.InterviewChatbot.models.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public void register(User u){
        User exists = userDao.fetchUser(u.getEmail());
        if(exists !=null){
            throw new RuntimeException("USER ALREADY EXIST.");
        }
        userDao.saveUser(u);
    }

    public User login(String email, String password){
        User exists = userDao.fetchUser(email);
        if(exists == null){
            throw new RuntimeException("USER NOT FOUND.");
        }
        if (!exists.getPassword().equals(password)){
            throw new RuntimeException("INVALID PASSWORD OR EMAIL.");
        }
        return exists;
    }
}
