package com.ssafy.project_service.mongodb.entity;



import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Getter
@Setter
@Document(collection = "ideas")
public class MongoIdea {
    @Id
    @Field("idea_id")
    private Long id;
    @Field("idea_erd")
    private Object erd;
    @Field("idea_flow_chart")
    private String flowChart;
}
