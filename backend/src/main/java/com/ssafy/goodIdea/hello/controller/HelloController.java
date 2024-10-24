package com.ssafy.goodIdea.hello.controller;

import com.ssafy.goodIdea.auth.AuthTokens;
import com.ssafy.goodIdea.auth.OAuthLoginParams;
import com.ssafy.goodIdea.auth.gitlab.GitLabLoginParams;
import com.ssafy.goodIdea.auth.service.OAuthLoginService;
import com.ssafy.goodIdea.hello.dto.response.HelloResponseDto;
import com.ssafy.goodIdea.hello.service.HelloService;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/hello")
@RequiredArgsConstructor
public class HelloController {

    private final HelloService helloService;
    private final OAuthLoginService oAuthLoginService;

    @GetMapping("/{helloId}")
    @ResponseBody
    public ApiResponse<HelloResponseDto> getHello(@PathVariable("helloId") Long helloId){
        return ApiResponse.ok(helloService.getHello(helloId));
    }

    // GitLab OAuth callback endpoint
    @GetMapping("/callback")
    @ResponseBody
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

    @GetMapping("")
    public String goHello(){
        return "OAuthGitLab";
    }
}
