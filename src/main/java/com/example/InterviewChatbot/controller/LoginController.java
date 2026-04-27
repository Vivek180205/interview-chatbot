package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.models.User;
import com.example.InterviewChatbot.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User req){
        userService.register(req);
        System.out.println(req);
        return "SignedUp Successfully";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User req ){
        System.out.println(req);
        User user = userService.login(req.getEmail(), req.getPassword());
        if (user == null){
            return "Invalid Credentials.";
        }

        return "Login Succesfully";
    }
}
