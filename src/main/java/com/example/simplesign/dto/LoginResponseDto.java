package com.example.simplesign.dto;

import com.example.simplesign.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private String token;
    private int exprTime;
    private UserEntity user;
}
