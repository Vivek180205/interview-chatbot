package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.LoginRequest;
import com.example.InterviewChatbot.dto.SignupRequest;
import com.example.InterviewChatbot.models.User;
import com.example.InterviewChatbot.service.CaptchaService;
import com.example.InterviewChatbot.service.UserService;
import com.example.InterviewChatbot.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final CaptchaService captchaService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, CaptchaService captchaService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.captchaService = captchaService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest req){

        try{
            userService.register(req);
            return ResponseEntity.ok("Signup successful");

        } catch (RuntimeException e){
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {

        String email = request.getEmail();
        String password = request.getPassword();
        String captcha = request.getCaptcha();

        // remember to comment this IF when running on postman
//        if(!"test".equals(captcha)){
//            return ResponseEntity.badRequest().body("Captcha Failed.");
//        }

        if (!captchaService.verifyCaptcha(captcha)) {
            return ResponseEntity.badRequest().body("Captcha Failed");
        }

        userService.login(email, password);

        String token = jwtUtil.generateToken(email);
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(Map.of(
                "token", token,
                "userId", user.getId(),
                "email", email
        ));
    }
}
