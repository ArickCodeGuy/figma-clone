package com.example.backend.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Config.JwtHelper;
import com.example.backend.Dto.AuthRequestDto;
import com.example.backend.Dto.AuthResponseDto;
import com.example.backend.Entity.UserEntity;
import com.example.backend.Repository.UserRepository;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

  private final UserRepository userRepository;
  private final JwtHelper jwtHelper;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  public AuthController(UserRepository userRepository, JwtHelper jwtHelper,
      BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.jwtHelper = jwtHelper;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto authRequest) {
    if (!isValid(authRequest)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // Passwords are stored as BCrypt hashes, so they have to be checked with the
    // same encoder; they cannot be compared inside an SQL query.
    UserEntity user = userRepository.findByUsername(authRequest.username().trim());
    if (user == null || !bCryptPasswordEncoder.matches(authRequest.password(), user.getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(new AuthResponseDto(jwtHelper.createJwt(user.getUsername(), List.of())));
  }

  @PostMapping("/signup")
  public ResponseEntity<AuthResponseDto> signup(@RequestBody AuthRequestDto authRequest) {
    if (!isValid(authRequest)) {
      return ResponseEntity.badRequest().build();
    }

    String username = authRequest.username().trim();
    if (userRepository.existsByUsername(username)) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    UserEntity user = new UserEntity(username, bCryptPasswordEncoder.encode(authRequest.password()));
    userRepository.save(user);

    // Use the trimmed name: it is what is stored and what TodoController looks up.
    return ResponseEntity.ok(new AuthResponseDto(jwtHelper.createJwt(username, List.of())));
  }

  private static boolean isValid(AuthRequestDto authRequest) {
    return authRequest != null
        && authRequest.username() != null && !authRequest.username().isBlank()
        && authRequest.password() != null && !authRequest.password().isEmpty();
  }
}
