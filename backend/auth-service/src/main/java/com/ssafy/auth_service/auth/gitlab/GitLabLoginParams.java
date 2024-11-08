package com.ssafy.auth_service.auth.gitlab;

import com.ssafy.auth_service.auth.OAuthLoginParams;

import com.ssafy.auth_service.common.entity.OAuthProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Setter
@Getter
@NoArgsConstructor
public class GitLabLoginParams implements OAuthLoginParams {

    private String authorizationCode;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.GitLab;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        return body;
    }

}