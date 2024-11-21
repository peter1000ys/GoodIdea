package com.ssafy.auth_service.auth;


import com.ssafy.auth_service.common.entity.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
}