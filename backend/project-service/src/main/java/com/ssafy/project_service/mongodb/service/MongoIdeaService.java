package com.ssafy.project_service.mongodb.service;
import com.google.gson.Gson;
import com.ssafy.project_service.common.exception.BaseException;
import com.ssafy.project_service.common.exception.ErrorType;
import com.ssafy.project_service.common.util.StringParserUtil;
import com.ssafy.project_service.mongodb.entity.*;
import com.ssafy.project_service.mongodb.repository.MongoIdeaRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MongoIdeaService {

    private final MongoTemplate mongoTemplate;
    private final Gson gson;
    private final MongoIdeaRepository mongoIdeaRepository;


    /**
     * 프로젝트 ERD 정보
     **/
    public Object findIdeaErd(Long ideaId) {
        var idea = mongoIdeaRepository.findErdById(ideaId).orElseThrow(() ->
                new BaseException(ErrorType.PROJECT_NOT_FOUND));

        if (Objects.isNull(idea.getErd())) {
            Object sampleErd = getSampleErdDoc();
            Query query = new Query(Criteria.where("_id").is(ideaId));
            Update update = new Update().set("idea_erd", sampleErd);
            mongoTemplate.updateFirst(query, update, MongoIdea.class);
            return sampleErd;
        }

        return idea.getErd();
    }

    /**
     * 프로젝트 ERD 업데이트
     **/
    @Transactional
    public Object changeIdeaErd(Long ideaId, Object erdDoc) {
        var project = mongoIdeaRepository.findErdById(ideaId).orElseThrow(() ->
                new BaseException(ErrorType.PROJECT_NOT_FOUND));

        Query query = new Query(Criteria.where("_id").is(ideaId));
        Update update = new Update().set("idea_erd", erdDoc);
        mongoTemplate.updateFirst(query, update, MongoIdea.class);

        return erdDoc;
    }

    /**
     * 프로젝트 API 명세서 정보 업데이트
     **/
    public String updateIdeaApiDoc(Long ideaId, UpdateApiDoc updateApiDoc) {
        ApiDoc apiDoc = UpdateApiDoc.toApiDoc(updateApiDoc);
        Query query = new Query(Criteria.where("_id").is(ideaId));
        // id가 없으면 save 수행
        if (Objects.isNull(apiDoc.getId())) {
            apiDoc.setId(UUID.randomUUID()); // id setting
            Update update = new Update().addToSet("idea_api_doc.api_docs", apiDoc);
            mongoTemplate.updateFirst(query, update, MongoIdea.class);
            return apiDoc.getId().toString();
        }
        // update 수행
        query.addCriteria(Criteria.where("idea_api_doc.api_docs.api_doc_id").is(apiDoc.getId()));
        Update update = new Update().set("idea_api_doc.api_docs.$", apiDoc);
        mongoTemplate.updateFirst(query, update, MongoIdea.class);
        return updateApiDoc.id().toString();
    }

    /**
     * 프로젝트 API 명세서 정보 삭제
     **/
    public String deleteIdeaApiDoc(Long ideaId, UUID apiDocId) {
        Query query = new Query(Criteria.where("_id").is(ideaId));
        Update update = new Update().pull("idea_api_doc.api_docs", Query.query(Criteria.where("api_doc_id").is(apiDocId)));
        var result = mongoTemplate.updateFirst(query, update, MongoIdea.class);

        if (result.wasAcknowledged() && result.getModifiedCount() > 0) {
            return "삭제 성공";
        }

        return "삭제 실패";
    }

    /**
     * API DOC 조회
     **/
    public GetApiDoc findIdeaSingleApiDocs(
            Long ideaId, UUID apiDocId
    ) {
        ApiDoc apiDoc = getIdeaApiDoc(ideaId, apiDocId);

        return GetApiDoc.of(apiDoc, new ArrayList<>(StringParserUtil.extractBracketsContent(apiDoc.getApiUrl())));
    }

    /**
     * API DOC 조회
     **/
    private ApiDoc getIdeaApiDoc(Long ideaId, UUID apiDocId) {
        Query query = new Query().addCriteria(Criteria.where("_id").is(ideaId));
        query.fields().include("idea_api_doc.api_docs.$");
        query.addCriteria(Criteria.where("idea_api_doc.api_docs.api_doc_id").is(apiDocId));

        MongoIdea idea = mongoTemplate.findOne(query, MongoIdea.class);

        if (idea == null || idea.getApiDocs() == null || idea.getApiDocs().getApiDocList().isEmpty()) {
            throw new BaseException(ErrorType.NOT_FOUND_API_DOC);
        }

        return idea.getApiDocs().getApiDocList().get(0);
    }

    /**
     * API 명세서 리스트 정보
     **/
    @Transactional(readOnly = true)
    public List<GetSimpleApiDoc> findIdeaApiDocs(Long ideaId) {
        var idea = mongoIdeaRepository.findIdeaApiDocs(ideaId).orElseThrow(() ->
                new BaseException(ErrorType.IDEA_NOT_FOUND));

        if (Objects.isNull(idea.getApiDocs()) || Objects.isNull(idea.getApiDocs().getApiDocList())) {
            return List.of();
        }

        var apiDocs = idea.getApiDocs().getApiDocList();
        return apiDocs.stream().map(GetSimpleApiDoc::of).toList();
    }


    /**
     * Erd 기본 Schema 정보
     **/
    public Object getSampleErdDoc() {
        String json = """
                {
                   "$schema": "https://raw.githubusercontent.com/dineug/erd-editor/main/json-schema/schema.json",
                   "version": "3.0.0",
                   "settings": {
                     "width": 2000,
                     "height": 2000,
                     "scrollTop": 0,
                     "scrollLeft": 0,
                     "zoomLevel": 1,
                     "show": 431,
                     "database": 4,
                     "databaseName": "",
                     "canvasType": "ERD",
                     "language": 1,
                     "tableNameCase": 4,
                     "columnNameCase": 2,
                     "bracketType": 1,
                     "relationshipDataTypeSync": true,
                     "relationshipOptimization": false,
                     "columnOrder": [
                       1,
                       2,
                       4,
                       8,
                       16,
                       32,
                       64
                     ],
                     "maxWidthComment": -1,
                     "ignoreSaveSettings": 0
                   },
                   "doc": {
                     "tableIds": [],
                     "relationshipIds": [],
                     "indexIds": [],
                     "memoIds": []
                   },
                   "collections": {
                     "tableEntities": {},
                     "tableColumnEntities": {},
                     "relationshipEntities": {},
                     "indexEntities": {},
                     "indexColumnEntities": {},
                     "memoEntities": {}
                   },
                   "lww": {}
                }
                """;
        return gson.fromJson(json, Object.class);
    }
}
