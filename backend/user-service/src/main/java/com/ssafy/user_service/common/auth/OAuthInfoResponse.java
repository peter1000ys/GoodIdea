package com.ssafy.user_service.common.auth;


import com.ssafy.user_service.user.entity.OAuthProvider;
import com.ssafy.user_service.user.entity.RoleType;

public interface OAuthInfoResponse {
    String getUsername();
    RoleType getRoleType();
    void setRoleType(RoleType roleType);
    OAuthProvider getOAuthProvider();
}