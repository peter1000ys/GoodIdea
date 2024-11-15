package com.ssafy.project_service.mongodb.controller;

import com.ssafy.project_service.common.exception.ApiResponse;
import com.ssafy.project_service.mongodb.entity.GetApiDoc;
import com.ssafy.project_service.mongodb.entity.GetSimpleApiDoc;
import com.ssafy.project_service.mongodb.entity.UpdateApiDoc;
import com.ssafy.project_service.mongodb.service.MongoIdeaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


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
    /**
     * 프로젝트 API 명세서  등록 / 업데이트
     **/
    @PostMapping("/{ideaId}/api-docs")
    public ApiResponse<String> insertIdeaApiDoc(
            @PathVariable Long ideaId,
            @RequestBody UpdateApiDoc updateApiDoc
    ) {
        return ApiResponse.ok(
                mongoIdeaService.updateIdeaApiDoc(ideaId, updateApiDoc)
        );
    }

    /**
     * 프로젝트 API 명세서 상세 조회
     **/
    @GetMapping("/{ideaId}/api-docs/{apiDocId}")
    public ApiResponse<GetApiDoc> findIdeaSingleApiDoc(
            @PathVariable Long ideaId,
            @PathVariable String apiDocId
    ) {
        return ApiResponse.ok(
                mongoIdeaService.findIdeaSingleApiDocs(ideaId, UUID.fromString(apiDocId))
        );
    }

    /**
     * 프로젝트 API 명세서 목록 조회
     **/
    @GetMapping("/{ideaId}/api-docs")
    public ApiResponse<List<GetSimpleApiDoc>> findIdeaApiDocs(
            @PathVariable Long ideaId
    ) {
        return ApiResponse.ok(
                mongoIdeaService.findIdeaApiDocs(ideaId)
        );
    }

    /**
     * 프로젝트 API 명세서 삭제
     **/
    @DeleteMapping("/{ideaId}/api-docs/{apiDocId}")
    public ApiResponse<String> deleteIdeaApiDoc(
            @PathVariable Long ideaId,
            @PathVariable String apiDocId
    ) {
        return ApiResponse.ok(
                mongoIdeaService.deleteIdeaApiDoc(ideaId, UUID.fromString(apiDocId))
        );
    }

}
