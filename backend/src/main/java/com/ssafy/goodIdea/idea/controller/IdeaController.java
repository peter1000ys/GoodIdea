package com.ssafy.goodIdea.idea.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.goodIdea.common.annotation.CurrentUser;
import com.ssafy.goodIdea.common.entity.MsgType;
import com.ssafy.goodIdea.common.exception.ApiResponse;
import com.ssafy.goodIdea.idea.dto.request.IdeaCreateRequestDto;
import com.ssafy.goodIdea.idea.dto.response.IdeaCreateResponseDto;
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
}
