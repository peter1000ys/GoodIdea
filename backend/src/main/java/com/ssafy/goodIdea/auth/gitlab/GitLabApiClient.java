package com.ssafy.goodIdea.auth.gitlab;

import com.ssafy.goodIdea.auth.OAuthApiClient;
import com.ssafy.goodIdea.auth.OAuthInfoResponse;
import com.ssafy.goodIdea.auth.OAuthLoginParams;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GitLabApiClient implements OAuthApiClient {

    private static final String GRANT_TYPE = "authorization_code";

    @Value("${oauth.gitlab.url.auth}")
    private String authUrl;

    @Value("${oauth.gitlab.url.api}")
    private String apiUrl;

    @Value("${oauth.gitlab.url.token}")
    private String tokenUrl;

    @Value("${oauth.gitlab.client-id}")
    private String clientId;

    @Value("${oauth.gitlab.client-secret}")
    private String clientSecret;

    @Value("${oauth.gitlab.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.GitLab;
    }

    // Authorization code를 기반으로 인증 API 요청을 해서 Access 토큰을 획득
    @Override
    public String requestAccessToken(OAuthLoginParams params) {
        String url = tokenUrl;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = params.makeBody();
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", redirectUri);
        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

        GitLabTokens response = restTemplate.postForObject(url, request, GitLabTokens.class);

        assert response != null;
        return response.getAccessToken();
    }

    // access 토큰을 기반으로 유저 정보를 포함한 프로필 정보를 획득
    @Override
    public OAuthInfoResponse requestOauthInfo(String accessToken) {
        String url = apiUrl + "/user";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer " + accessToken);
        HttpEntity<?> request = new HttpEntity<>(httpHeaders);

        ResponseEntity<GitLabInfoResponse> response = restTemplate.exchange(
                url, HttpMethod.GET, request, GitLabInfoResponse.class);

        RoleType roleType = findUserRole(accessToken);
        response.getBody().setRoleType(roleType);

        // 200 OK 응답일 경우에만 사용자 정보를 반환
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new BaseException(ErrorType.NOT_FOUND_USER);
        }
    }

    // 유저를 일반 사용자인지, 컨설턴트인지 확인
    public RoleType findUserRole(String accessToken) {
        String url = apiUrl + "/groups?min_access_level=10";  // 그룹 API 엔드포인트

        // 헤더 설정 (AccessToken 포함)
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer " + accessToken);
        HttpEntity<?> request = new HttpEntity<>(httpHeaders);

        // GitLab API에 요청을 보냄
        ResponseEntity<GitLabGroupResponse[]> response = restTemplate.exchange(
                url, HttpMethod.GET, request, GitLabGroupResponse[].class);

        // 200 OK 응답일 경우에만 처리
        if (response.getStatusCode() == HttpStatus.OK) {
            List<GitLabGroupResponse> groups = Arrays.asList(response.getBody());

            // name 필드에 'coach' 또는 'consultants'가 포함된 그룹 찾기
            boolean isConsultant = groups.stream().anyMatch(group ->
                    group.getName().toLowerCase().contains("consultants") ||
                            group.getName().toLowerCase().contains("coach"));

            // 역할에 따른 응답 반환
            if (isConsultant) {
                return RoleType.CONSULTANT;
            } else {
                return RoleType.USER;
            }
        } else {
            throw new BaseException(ErrorType.SERVER_ERROR);
        }
    }
}