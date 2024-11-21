package com.ssafy.project_service.project.entity;


import com.ssafy.project_service.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Project extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

//    GitLab projectId
    private Long gitLabProjectId;

    //    팀 이름
    @Setter
    private String teamName;

    //    메인 아이디어
    @Setter
    private Long mainIdeaId;

    //    팀 리더
    @Setter
    private Long leader;

//    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    @Enumerated(value = EnumType.STRING)
    @Setter
    private ProjectType projectType;

//    깃랩 이름
    private String gitlabName;

//    깃랩 주소
    private String gitlab_url;

    @Builder
    public Project(ProjectType projectType, String gitlabName, String gitlab_url, Long gitLabProjectId, String teamName, Long leader, Long mainIdeaId) {
        this.teamName = teamName;
        this.projectType = projectType;
        this.leader = leader;
        this.mainIdeaId = mainIdeaId;
        this.gitlabName = gitlabName;
        this.gitlab_url = gitlab_url;
        this.gitLabProjectId = gitLabProjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) &&
                Objects.equals(gitLabProjectId, project.gitLabProjectId) &&
                Objects.equals(teamName, project.teamName) &&
                projectType == project.projectType &&
                Objects.equals(gitlabName, project.gitlabName) &&
                Objects.equals(gitlab_url, project.gitlab_url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, gitLabProjectId, teamName);
    }
}
