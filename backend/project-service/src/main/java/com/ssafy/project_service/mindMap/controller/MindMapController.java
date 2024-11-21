package com.ssafy.project_service.mindMap.controller;


import com.ssafy.project_service.client.UserServiceClient;
import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.exception.ApiResponse;
import com.ssafy.project_service.jwt.JwtTokenProvider;
import com.ssafy.project_service.mindMap.dto.request.MindMapCreateRequestDto;
import com.ssafy.project_service.mindMap.dto.response.MindMapResponseDto;
import com.ssafy.project_service.mindMap.service.MindMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/mindmap")
public class MindMapController {

    private final MindMapService mindMapService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserServiceClient userServiceClient;

    /*
    * 마인드맵 조회
    * */
    @GetMapping("/{projectId}")
    public ApiResponse<MindMapResponseDto> getMindMap(@RequestHeader("Authorization") String authorizationHeader, @PathVariable("projectId") Long projectId){
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        return ApiResponse.ok(mindMapService.getMindMap(user, projectId));
    }

    /*
     * 마인드맵 생성
     * */
    @PostMapping("/{projectId}/create")
    public ApiResponse<MindMapResponseDto> createMindMap(@RequestHeader("Authorization") String authorizationHeader,
                                                         @PathVariable("projectId") Long projectId,
                                                         @RequestBody MindMapCreateRequestDto dto){
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        return ApiResponse.ok(mindMapService.createMindMap(user, projectId, dto));
    }
}
