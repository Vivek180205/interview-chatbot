package com.example.InterviewChatbot.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CaptchaService {

    private static final String SECRET_KEY = "6Le9rc4sAAAAAEaT_WBtdLMAf6XWBW6dLgXREPRm";

    public boolean verifyCaptcha(String captchaResponse) {
        try {
            String url = "https://www.google.com/recaptcha/api/siteverify"
                    + "?secret=" + SECRET_KEY
                    + "&response=" + captchaResponse;

            RestTemplate restTemplate = new RestTemplate();
            Map response = restTemplate.postForObject(url, null, Map.class);

            return (Boolean) response.get("success");

        } catch (Exception e) {
            return false;
        }
    }
}