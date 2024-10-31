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
    private Long id;

//    GitLab projectId
    private Long gitLabProjectId;

//    프로젝트 이름
    @Setter
    private String name;

//    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    @Enumerated(value = EnumType.STRING)
    @Setter
    private ProjectType projectType;

//    프로젝트 설명
    @Setter
    private String description;

//    깃랩 이름
    private String gitlabName;

//    깃랩 주소
    private String gitlab_url;

    @Builder
    public Project(String name, ProjectType projectType, String description, String gitlabName, String gitlab_url, Long gitLabProjectId) {
        this.name = name;
        this.projectType = projectType;
        this.description = description;
        this.gitlabName = gitlabName;
        this.gitlab_url = gitlab_url;
        this.gitLabProjectId = gitLabProjectId;
    }
}
