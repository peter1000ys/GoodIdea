package com.ssafy.goodIdea.project.dto.request;

import com.ssafy.goodIdea.idea.entity.Idea;
import com.ssafy.goodIdea.project.entity.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProjectUpdateRequestDto {
//    프로젝트 타입
    ProjectType projectType;
//    팀명
    String teamName;
//    메인 아이디어 Id;
    Long mainIdeaId;
}
