package com.vantus.project.controller;

import com.vantus.project.model.LoginRequest;
import com.vantus.project.model.LoginResponse;
import com.vantus.project.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request.getCorreo(), request.getContrasena());
    }
}
