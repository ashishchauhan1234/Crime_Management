package com.crime_management.controller;

import com.crime_management.domain.Role;
import com.crime_management.dto.JwtResponse;
import com.crime_management.dto.LoginRequest;
import com.crime_management.dto.RegisterRequest;
import com.crime_management.model.User;
import com.crime_management.security.JwtService;
import com.crime_management.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest req) {
        User user = authService.register(req.username(), req.password(), req.role());
        return ResponseEntity.ok("Registration Successful");
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest req) {
        User user = authService.authenticate(req.username(), req.password());
        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}