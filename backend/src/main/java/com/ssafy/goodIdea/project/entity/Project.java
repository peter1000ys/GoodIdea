package com.ssafy.goodIdea.project.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    Long id;

//    GitLab projectId
    Long gitLabProjectId;

//    프로젝트 이름
    @Setter
    String name;

//    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    @Enumerated(value = EnumType.STRING)
    @Setter
    ProjectType projectType;

//    프로젝트 설명
    @Setter
    String description;

//    깃랩 이름
    String gitlab_name;

//    깃랩 주소
    String gitlab_url;

    @Builder
    public Project(String name, ProjectType projectType, String description, String gitlab_name, String gitlab_url, Long gitLabProjectId) {
        this.name = name;
        this.projectType = projectType;
        this.description = description;
        this.gitlab_name = gitlab_name;
        this.gitlab_url = gitlab_url;
        this.gitLabProjectId = gitLabProjectId;
    }
}
