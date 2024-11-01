package com.ssafy.goodIdea.auth.controller;

import com.ssafy.goodIdea.auth.AuthTokens;
import com.ssafy.goodIdea.auth.gitlab.GitLabLoginParams;
import com.ssafy.goodIdea.auth.service.OAuthLoginService;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
    public void gitLabCallback(
            @RequestParam("code") String authorizationCode,
            @RequestParam("state") String state,
            HttpServletResponse response) throws IOException {

        // GitLabLoginParams 객체 생성 및 Authorization Code 설정
        GitLabLoginParams params = new GitLabLoginParams();
        params.setAuthorizationCode(authorizationCode);
        params.makeBody().add("code", authorizationCode);

        // Authorization Code를 사용해 Access Token을 요청
        AuthTokens authTokens = oAuthLoginService.login(params);

        // JWT 토큰을 Authorization 헤더에 설정
        response.setHeader("Authorization", "Bearer " + authTokens.getAccessToken());

        // 프론트엔드 페이지로 리다이렉트
        response.sendRedirect("https://oracle1.mypjt.xyz");
    }
}