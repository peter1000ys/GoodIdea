package com.ssafy.goodIdea.auth;


import com.ssafy.goodIdea.auth.gitlab.GitLabTokens;
import com.ssafy.goodIdea.user.entity.OAuthProvider;

public interface OAuthApiClient {
    OAuthProvider oAuthProvider();
    GitLabTokens requestAccessToken(OAuthLoginParams params);
    OAuthInfoResponse requestOauthInfo(GitLabTokens token);
}