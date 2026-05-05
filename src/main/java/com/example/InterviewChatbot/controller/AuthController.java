package com.example.InterviewChatbot.controller;

import com.example.InterviewChatbot.dto.LoginRequest;
import com.example.InterviewChatbot.dto.SignupRequest;
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
    public String registerUser(@Valid @RequestBody SignupRequest req){
        userService.register(req);
        return "SignedUp Successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {

        String email = request.getEmail();
        String password = request.getPassword();
        String captcha = request.getCaptcha();

//        if(!"test".equals(captcha)){
//            return ResponseEntity.badRequest().body("Captcha Failed.");
//        }
        if (!captchaService.verifyCaptcha(captcha)) {
            return ResponseEntity.badRequest().body("Captcha Failed");
        }

        userService.login(email, password);

        String token = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Map.of(
                "token", token
        ));
    }

    @GetMapping("/test")
    public String testApi() {
        return "JWT working bro 🔥";
    }

    @GetMapping("/me")
    public String getUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
