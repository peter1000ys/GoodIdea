package com.ssafy.auth_service.auth;


import com.ssafy.auth_service.common.entity.OAuthProvider;
import com.ssafy.auth_service.common.entity.RoleType;

public interface OAuthInfoResponse {
    String getUsername();
    RoleType getRoleType();
    void setRoleType(RoleType roleType);
    OAuthProvider getOAuthProvider();
}