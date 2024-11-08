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

    @GetMapping("/{helloId}")
    @ResponseBody
    public ApiResponse<HelloResponseDto> getHello(@PathVariable("helloId") Long helloId){
        return ApiResponse.ok(helloService.getHello(helloId));
    }

    @GetMapping("")
    public String goHello(){
        return "OAuthGitLab";
    }
}
