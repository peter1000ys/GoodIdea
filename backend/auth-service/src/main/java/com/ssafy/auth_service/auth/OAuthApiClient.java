package com.ssafy.auth_service.auth;


import com.ssafy.auth_service.auth.gitlab.GitLabTokens;
import com.ssafy.auth_service.common.entity.OAuthProvider;


public interface OAuthApiClient {
    OAuthProvider oAuthProvider();
    GitLabTokens requestAccessToken(OAuthLoginParams params);
    OAuthInfoResponse requestOauthInfo(GitLabTokens token);
}