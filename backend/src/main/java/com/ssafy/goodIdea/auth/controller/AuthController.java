package com.ssafy.goodIdea.auth.controller;

//import back.shoppingMart.common.auth.AuthTokens;
//import back.shoppingMart.common.auth.service.OAuthLoginService;
//import back.shoppingMart.common.response.MsgType;
//import back.shoppingMart.common.response.ResponseEntityDto;
//import back.shoppingMart.common.response.ResponseUtils;
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
}