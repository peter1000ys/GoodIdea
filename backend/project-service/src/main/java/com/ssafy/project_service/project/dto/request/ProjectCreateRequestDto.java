package com.ssafy.project_service.project.dto.request;


import com.ssafy.project_service.project.entity.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ProjectCreateRequestDto {
    //    GitLab 프로젝트 Id
    Long projectId;
    //    팀 이름
    String teamName;
    //    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    ProjectType projectType;
}
