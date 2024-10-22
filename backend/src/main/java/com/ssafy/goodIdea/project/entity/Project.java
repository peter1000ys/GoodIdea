package com.ssafy.goodIdea.project.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    Long id;

//    프로젝트 이름
    String name;

//    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    @Enumerated(value = EnumType.STRING)
    ProjectType projectType;

//    프로젝트 설명
    String description;

//    깃랩 이름
    String gitlab_name;

//    깃랩 주소
    String gitlab_url;

}
