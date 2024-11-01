package com.ssafy.goodIdea.auth.gitlab;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.goodIdea.auth.OAuthApiClient;
import com.ssafy.goodIdea.auth.OAuthInfoResponse;
import com.ssafy.goodIdea.auth.OAuthLoginParams;
import com.ssafy.goodIdea.auth.RequestOAuthInfoService;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import com.ssafy.goodIdea.common.redis.RedisService;
import com.ssafy.goodIdea.project.dto.response.GitLabProjectResponseDto;
import com.ssafy.goodIdea.user.dto.response.GitLabUserResponseDto;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;
import com.ssafy.goodIdea.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
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
    private final RedisService redisService;

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.GitLab;
    }

    // Authorization code를 기반으로 인증 API 요청을 해서 토큰을 획득
    @Override
    public GitLabTokens requestAccessToken(OAuthLoginParams params) {
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
        return response;
    }

    // access 토큰을 기반으로 유저 정보를 포함한 프로필 정보를 획득
    @Override
    public OAuthInfoResponse requestOauthInfo(GitLabTokens token) {
        String url = apiUrl + "/user";
        String accessToken = token.getAccessToken();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer " + accessToken);
        HttpEntity<?> request = new HttpEntity<>(httpHeaders);

        ResponseEntity<GitLabInfoResponse> response = restTemplate.exchange(
                url, HttpMethod.GET, request, GitLabInfoResponse.class);

        RoleType roleType = findUserRole(accessToken);
        response.getBody().setRoleType(roleType);

//      gitlab accesskey redis 저장
        redisService.setValues("gitlab:access-token" + response.getBody().getUsername(), token.getAccessToken(), Duration.ofHours(1));
        redisService.setValues("gitlab:refresh-token" + response.getBody().getUsername(), token.getRefreshToken(), Duration.ofDays(7));

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

    /*
    * 유저 GitLab 프로젝트 목록 조회
    * */
    public List<GitLabProjectResponseDto> getGitLabProjects(String username) throws JsonProcessingException {
        String url = apiUrl + "/projects?min_access_level=40&membership=true";
        ObjectMapper objectMapper = new ObjectMapper();

        // Redis에서 GitLab Access Token 가져오기
        String accessToken = redisService.getValues("gitlab:access-token" + username);

        if (accessToken == null || "false".equals(accessToken)) {
            // Access Token이 없거나 만료된 경우 Refresh Token을 사용하여 재발급
            accessToken = refreshGitLabAccessToken(username);
        }

        // GitLab API 호출
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, String.class);

        return objectMapper.readValue(response.getBody(), new TypeReference<List<GitLabProjectResponseDto>>() {});
    }

    /*
     * 유저 GitLab 프로젝트 단일 조회
     * */
    public GitLabProjectResponseDto getGitLabProject(String username, Long projectId) throws JsonProcessingException {
        String url = apiUrl + "/projects/"+projectId;
        ObjectMapper objectMapper = new ObjectMapper();

        // Redis에서 GitLab Access Token 가져오기
        String accessToken = redisService.getValues("gitlab:access-token" + username);

        if (accessToken == null || "false".equals(accessToken)) {
            // Access Token이 없거나 만료된 경우 Refresh Token을 사용하여 재발급
            accessToken = refreshGitLabAccessToken(username);
        }

        // GitLab API 호출
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, String.class);

        return objectMapper.readValue(response.getBody(), new TypeReference<GitLabProjectResponseDto>() {});
    }

    /*
     * 유저 GitLab 프로젝트 멤버 조회
     * */
    public List<GitLabUserResponseDto> getGitLabMembers(String username, Long projectId) throws JsonProcessingException {
        String url = apiUrl + "/projects/"+projectId+"/members";
        ObjectMapper objectMapper = new ObjectMapper();

        // Redis에서 GitLab Access Token 가져오기
        String accessToken = redisService.getValues("gitlab:access-token" + username);

        if (accessToken == null || "false".equals(accessToken)) {
            // Access Token이 없거나 만료된 경우 Refresh Token을 사용하여 재발급
            accessToken = refreshGitLabAccessToken(username);
        }

        // GitLab API 호출
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, String.class);

        return objectMapper.readValue(response.getBody(), new TypeReference<List<GitLabUserResponseDto>>() {});
    }

    /*
    * Redis의 Refresh 토큰을 통해 Access Token 재발급
    * */
    private String refreshGitLabAccessToken(String username) {
        // Redis에서 Refresh Token 가져오기
        String refreshToken = redisService.getValues("gitlab:refresh-token" + username);

        if (refreshToken == null || "false".equals(refreshToken)) {
            throw new BaseException(ErrorType.GITLAB_TOKEN_ERROR);
        }

        // Refresh Token으로 Access Token 재발급 요청
        GitLabTokens newTokens = refreshGitLabTokens(refreshToken);

        // Redis에 새로운 Access Token과 Refresh Token 저장
        redisService.setValues("gitlab:access-token" + username, newTokens.getAccessToken(), Duration.ofHours(1));
        redisService.setValues("gitlab:refresh-token" + username, newTokens.getRefreshToken(), Duration.ofDays(7));

        return newTokens.getAccessToken();
    }

    /*
    * Access Token과 Refresh Token을 요청하는 메서드
    **/
    public GitLabTokens requestGitLabTokens(GitLabLoginParams params) {
        String url = tokenUrl;
        HttpEntity<GitLabLoginParams> request = new HttpEntity<>(params);

        ResponseEntity<GitLabTokens> response = restTemplate.postForEntity(url, request, GitLabTokens.class);
        return response.getBody();
    }

    // Refresh Token을 사용하여 새로운 GitLab에 Access Token 요청
    public GitLabTokens refreshGitLabTokens(String refreshToken) {
        String url = tokenUrl;
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "refresh_token");
        body.add("client_id", clientId); // clientId 추가
        body.add("client_secret", clientSecret); // clientSecret 추가
        body.add("refresh_token", refreshToken);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<GitLabTokens> response = restTemplate.postForEntity(url, request, GitLabTokens.class);

        return response.getBody();
    }

}