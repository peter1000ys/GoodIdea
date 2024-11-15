package com.ssafy.project_service.mongodb.controller;

import com.ssafy.project_service.common.exception.ApiResponse;
import com.ssafy.project_service.mongodb.service.MongoIdeaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/mongo")
public class MongoIdeaController {

    private final MongoIdeaService mongoIdeaService;

    /**
     * 프로젝트 ERD 조회
     **/
    @GetMapping("/{ideaId}/erd")
    public ApiResponse<Object> findIdeaErd(
            @PathVariable(name = "ideaId") Long ideaId
    ) {
        return ApiResponse.ok(
                mongoIdeaService.findIdeaErd(ideaId)
        );
    }

    /**
     * 프로젝트 ERD 업데이트
     **/
    @PutMapping("/{ideaId}/erd")
    public ApiResponse<Object> changeIdeaErd(
            @PathVariable(name = "ideaId") Long ideaId,
            @RequestBody Object erdDoc
    ) {
        return ApiResponse.ok(
                mongoIdeaService.changeIdeaErd(ideaId, erdDoc)
        );
    }
}
