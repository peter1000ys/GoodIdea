package com.ssafy.goodIdea.idea.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.idea.dto.request.IdeaCreateRequestDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaCreateResponseDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaListResponseDto;
import com.ssafy.goodIdea.idea.service.IdeaService;
import com.ssafy.goodIdea.user.entity.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/idea")
public class IdeaController {

    private final IdeaService ideaService;

    /*
     * 아이디어 생성
     * return MsgType
     * */
    @PostMapping("/{projectId}/create")
    public ApiResponse<IdeaCreateResponseDto> createIdea(@CurrentUser User user, @PathVariable("projectId") Long projectId, @RequestBody IdeaCreateRequestDto dto) {
        return ApiResponse.ok(ideaService.createIdea(user, projectId, dto));
    }

    @GetMapping("/{projectId}")
    public ApiResponse<List<IdeaListResponseDto>> getIdeas(@PathVariable("projectId") Long projectId) {
        return ApiResponse.ok(ideaService.getIdeas(projectId));
    }
}
