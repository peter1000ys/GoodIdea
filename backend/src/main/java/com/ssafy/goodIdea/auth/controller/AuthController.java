package com.ssafy.goodIdea.auth.controller;

import com.ssafy.goodIdea.auth.AuthTokens;
import com.ssafy.goodIdea.auth.gitlab.GitLabLoginParams;
import com.ssafy.goodIdea.auth.service.OAuthLoginService;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final OAuthLoginService oAuthLoginService;

    @PostMapping("")
    public ApiResponse<AuthTokens> loginGitLab(@RequestBody GitLabLoginParams params, HttpServletResponse response) {
        AuthTokens authTokens = oAuthLoginService.login(params);
        response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + authTokens.getAccessToken());
        response.addHeader("Refresh-Token", "Bearer " + authTokens.getRefreshToken());
        return ApiResponse.ok(authTokens);
    }

    // GitLab OAuth callback endpoint
    @GetMapping("/callback")
    public ApiResponse<AuthTokens> gitLabCallback(
            @RequestParam("code") String authorizationCode,
            @RequestParam("state") String state) {

        // GitLabLoginParams 객체 생성 및 Authorization Code 설정
        GitLabLoginParams params = new GitLabLoginParams();
        params.setAuthorizationCode(authorizationCode);
        params.makeBody().add("code", authorizationCode);

        // Authorization Code를 사용해 Access Token을 요청
        AuthTokens authTokens = oAuthLoginService.login(params);

        // Access Token 출력
        return ApiResponse.ok(authTokens);
    }
}