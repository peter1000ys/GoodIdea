package com.ssafy.project_service.mongodb.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class RecDocs {
    @Builder.Default
    @Field("req_docs")
    private List<ReqDoc> recDocList = new ArrayList<>();
}
