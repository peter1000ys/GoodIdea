package com.ssafy.project_service.mongodb.service;
import com.google.gson.Gson;
import com.ssafy.project_service.common.exception.BaseException;
import com.ssafy.project_service.common.exception.ErrorType;
import com.ssafy.project_service.mongodb.entity.MongoIdea;
import com.ssafy.project_service.mongodb.repository.MongoIdeaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

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
