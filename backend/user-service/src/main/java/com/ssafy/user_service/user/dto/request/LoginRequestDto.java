package com.ssafy.user_service.user.dto.request;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
