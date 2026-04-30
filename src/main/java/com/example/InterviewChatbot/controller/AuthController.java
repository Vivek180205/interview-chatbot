package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.LoginRequest;
import com.example.InterviewChatbot.dto.SignupRequest;
import com.example.InterviewChatbot.service.CaptchaService;
import com.example.InterviewChatbot.service.UserService;
import jakarta.validation.Valid;
import lombok.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final CaptchaService captchaService;

    public AuthController(UserService userService, CaptchaService captchaService) {
        this.userService = userService;
        this.captchaService = captchaService;
    }

    @PostMapping("/register")
    public String registerUser(@Valid @RequestBody SignupRequest req){
        userService.register(req);
        return "SignedUp Successfully";
    }

    @PostMapping("/login")
    public String loginUser(@Valid @RequestBody LoginRequest request) {

        String email = request.getEmail();
        String password = request.getPassword();
        String captcha = request.getCaptcha();

//        if (!captchaService.verifyCaptcha(captcha)) {
//            return "Captcha Failed";
//        }

        if(!"test".equals(captcha)){
            return "Captcha Failed";
        }
        userService.login(email, password);
        return "Login Successfully";
    }
}
