package com.ssafy.project_service.idea.controller;

import java.util.List;

import com.ssafy.project_service.client.UserServiceClient;
import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.entity.MsgType;
import com.ssafy.project_service.common.exception.ApiResponse;
import com.ssafy.project_service.idea.dto.request.IdeaCreateRequestDto;
import com.ssafy.project_service.idea.dto.request.IdeaUpdateRequestDto;
import com.ssafy.project_service.idea.dto.response.IdeaCreateResponseDto;
import com.ssafy.project_service.idea.dto.response.IdeaDetailResponseDto;
import com.ssafy.project_service.idea.dto.response.IdeaListResponseDto;
import com.ssafy.project_service.idea.dto.response.IdeaUpdateResponseDto;
import com.ssafy.project_service.idea.service.IdeaService;
import com.ssafy.project_service.jwt.JwtTokenProvider;
import org.springframework.web.bind.annotation.*;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/idea")
public class IdeaController {

    private final IdeaService ideaService;
    private final UserServiceClient userServiceClient;
    private final JwtTokenProvider jwtTokenProvider;

    /*
     * 아이디어 생성
     * return created idea
     * */
    @PostMapping("/{projectId}/create")
    public ApiResponse<IdeaCreateResponseDto> createIdea(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "projectId") Long projectId, @RequestBody IdeaCreateRequestDto dto) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        return ApiResponse.ok(ideaService.createIdea(user, projectId, dto));
    }

    /*
     * 아이디어 목록 조회
     * return list of ideas
     * */
    @GetMapping("/{projectId}")
    public ApiResponse<List<IdeaListResponseDto>> getIdeas(@PathVariable(name = "projectId") Long projectId) {
        return ApiResponse.ok(ideaService.getIdeas(projectId));
    }

    /*
     * 아이디어 상세 조회
     * return idea detail
     * */
    @GetMapping("/{projectId}/{ideaId}")
    public ApiResponse<IdeaDetailResponseDto> getIdeaDetail(@PathVariable(name = "projectId") Long projectId, @PathVariable(name = "ideaId") Long ideaId) {
        return ApiResponse.ok(ideaService.getIdeaDetail(projectId, ideaId));
    }

    /*
     * 아이디어 채택
     * return selected idea
     */
    @PutMapping("/{ideaId}/select")
    public ApiResponse<MsgType> selectIdea(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "ideaId") Long ideaId) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        ideaService.selectIdea(user, ideaId);
        return ApiResponse.ok(MsgType.IDEA_SELECT_SUCCESS);
    }

    /*
     * 아이디어 채택 취소
     * return unselected idea
     */
    @PutMapping("/{ideaId}/unselect")
    public ApiResponse<MsgType> unselectIdea(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "ideaId") Long ideaId) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        ideaService.unselectIdea(user, ideaId);
        return ApiResponse.ok(MsgType.IDEA_UNSELECT_SUCCESS);
    }

    /*
     * 아이디어 수정
     * return updated idea
     */
    @PutMapping("/{ideaId}/update")
    public ApiResponse<IdeaUpdateResponseDto> updateIdea(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "ideaId") Long ideaId, @RequestBody IdeaUpdateRequestDto dto) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        return ApiResponse.ok(ideaService.updateIdea(user, ideaId, dto));
    }

    /*
     * 아이디어 삭제
     * return deleted idea
     */
    @DeleteMapping("/{ideaId}/delete")
    public ApiResponse<MsgType> deleteIdea(@RequestHeader("Authorization") String authorizationHeader, @PathVariable(name = "ideaId") Long ideaId) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtTokenProvider.extractSubject(token);
        UserDto user = userServiceClient.getUser(username).orElseThrow();
        ideaService.deleteIdea(user, ideaId);
        return ApiResponse.ok(MsgType.IDEA_DELETE_SUCCESS);
    }
}
