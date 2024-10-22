package com.ssafy.goodIdea.hello.controller;

import com.ssafy.goodIdea.hello.dto.response.HelloResponseDto;
import com.ssafy.goodIdea.hello.service.HelloService;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/hello")
@RequiredArgsConstructor
public class HelloController {

    private final HelloService helloService;

    @GetMapping("/{helloId}")
    public ApiResponse<HelloResponseDto> getHello(@PathVariable("helloId") Long helloId){
        return ApiResponse.ok(helloService.getHello(helloId));
    }

}
