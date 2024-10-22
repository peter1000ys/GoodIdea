package com.ssafy.goodIdea.auth;

import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;

public interface OAuthInfoResponse {
    String getEmail();
    String getUsername();
    RoleType getRoleType();
    void setRoleType(RoleType roleType);
    OAuthProvider getOAuthProvider();
}