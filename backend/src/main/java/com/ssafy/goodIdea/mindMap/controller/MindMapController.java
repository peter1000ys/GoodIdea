package com.ssafy.goodIdea.mindMap.controller;

import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.mindMap.dto.request.MindMapCreateRequestDto;
import com.ssafy.goodIdea.mindMap.dto.response.MindMapResponseDto;
import com.ssafy.goodIdea.mindMap.entity.MindMap;
import com.ssafy.goodIdea.mindMap.service.MindMapService;
import com.ssafy.goodIdea.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/mindmap")
public class MindMapController {

    private final MindMapService mindMapService;

    /*
    * 마인드맵 조회
    * */
    @GetMapping("/{projectId}")
    public ApiResponse<MindMapResponseDto> getMindMap(@CurrentUser User user, @PathVariable("projectId") Long projectId){
        return ApiResponse.ok(mindMapService.getMindMap(user, projectId));
    }

    /*
     * 마인드맵 생성
     * */
    @PostMapping("/{projectId}/create")
    public ApiResponse<MindMapResponseDto> createMindMap(@CurrentUser User user,
                                                         @PathVariable("projectId") Long projectId,
                                                         @RequestBody MindMapCreateRequestDto dto){
        return ApiResponse.ok(mindMapService.createMindMap(user, projectId, dto));
    }
}
