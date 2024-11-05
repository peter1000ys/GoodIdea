package com.ssafy.goodIdea.idea.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.idea.dto.request.IdeaCreateRequestDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaCreateResponseDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaDetailResponseDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaListResponseDto;
import com.ssafy.goodIdea.idea.service.IdeaService;
import com.ssafy.goodIdea.user.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/idea")
public class IdeaController {

    private final IdeaService ideaService;

    /*
     * 아이디어 생성
     * return created idea
     * */
    @PostMapping("/{projectId}/create")
    public ApiResponse<IdeaCreateResponseDto> createIdea(@CurrentUser User user, @PathVariable("projectId") Long projectId, @RequestBody IdeaCreateRequestDto dto) {
        return ApiResponse.ok(ideaService.createIdea(user, projectId, dto));
    }

    /*
     * 아이디어 목록 조회
     * return list of ideas
     * */
    @GetMapping("/{projectId}")
    public ApiResponse<List<IdeaListResponseDto>> getIdeas(@PathVariable("projectId") Long projectId) {
        return ApiResponse.ok(ideaService.getIdeas(projectId));
    }

    /*
     * 아이디어 상세 조회
     * return idea detail
     * */
    @GetMapping("/{projectId}/{ideaId}")
    public ApiResponse<IdeaDetailResponseDto> getIdeaDetail(@PathVariable("projectId") Long projectId, @PathVariable("ideaId") Long ideaId) {
        return ApiResponse.ok(ideaService.getIdeaDetail(projectId, ideaId));
    }
}
