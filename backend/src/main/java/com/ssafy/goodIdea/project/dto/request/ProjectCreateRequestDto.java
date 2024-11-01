package com.ssafy.goodIdea.project.dto.request;

import com.ssafy.goodIdea.project.entity.ProjectType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ProjectCreateRequestDto {
    //    GitLab 프로젝트 Id
    Long projectId;
    //    프로젝트 이름
    String name;
    //    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    ProjectType projectType;
    //    프로젝트 설명
    String description;
}
