package com.ssafy.goodIdea.auth;

import com.ssafy.goodIdea.auth.gitlab.GitLabApiClient;
import com.ssafy.goodIdea.auth.gitlab.GitLabLoginParams;
import com.ssafy.goodIdea.auth.gitlab.GitLabTokens;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class RequestOAuthInfoService {

    private final Map<OAuthProvider, GitLabApiClient> clients;

    public RequestOAuthInfoService(List<GitLabApiClient> clients, RestTemplate restTemplate) {
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(GitLabApiClient::oAuthProvider, Function.identity())
        );
    }

    public OAuthInfoResponse request(OAuthLoginParams params) {
        GitLabApiClient client = clients.get(params.oAuthProvider());
        GitLabTokens gitLabToken = client.requestAccessToken(params);

        return client.requestOauthInfo(gitLabToken);
    }

}