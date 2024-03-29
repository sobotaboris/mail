package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.entity.UserTokenState;
import com.osa.mailClient.security.TokenHelper;
import com.osa.mailClient.security.auth.JwtAuthenticationRequest;
import com.osa.mailClient.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.concurrent.locks.ReadWriteLock;


@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenHelper tokenHelper;

    @Autowired
    private UserService userService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/authentication")
    public ResponseEntity<?> authenticateUser(@RequestBody JwtAuthenticationRequest tokenRequest) throws AuthenticationException, IOException {
        UsernamePasswordAuthenticationToken authenticationRequest = new UsernamePasswordAuthenticationToken(tokenRequest.getUsername(), tokenRequest.getPassword());

        final Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(authenticationRequest);
        } catch (org.springframework.security.core.AuthenticationException ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();

        String token = tokenHelper.generateToken(user.getUsername());
        long expiresIn = tokenHelper.getExiprationDate(token);

        UserTokenState token_response = new UserTokenState(token, expiresIn);
        token_response.setUser_id(user.getId());
        token_response.setUsername(user.getUsername());

        return ResponseEntity.ok(token_response);
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.ok(new ResponseMessageDTO("Username is already used!"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);


        return ResponseEntity.ok(new ResponseMessageDTO(null));



    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestParam("userId") long id, @RequestParam("newPassword") String newPassword){
        User user = userService.findById(id);
        System.out.println(newPassword);
        user.setPassword(passwordEncoder.encode(newPassword));
        userService.save(user);
        return ResponseEntity.ok(new ResponseMessageDTO(null));

    }

    @PostMapping("/updateProfileData")
    public ResponseEntity<?> updateData(@RequestParam("userId") long userId, @RequestParam("username") String username, @RequestParam("firstname") String firstname, @RequestParam("lastname") String lastname){
        User user = userService.findById(userId);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setUsername(username);
        userService.save(user);
        return ResponseEntity.ok(new ResponseMessageDTO(null));
    }

}
