package com.ssafy.goodIdea.project.dto.response;

import com.ssafy.goodIdea.idea.dto.response.IdeaCreateResponseDto;
import com.ssafy.goodIdea.project.entity.ProjectType;
import com.ssafy.goodIdea.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ProjectResponseDto {
    //    프로젝트 ID
    Long project_id;
    //    gitlab 프로젝트 ID
    Long gitlab_project_id;
    //    팀 이름
    String teamName;
    //    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    ProjectType projectType;
    //    팀장
    String leader;
    //    대표 아이디어
    IdeaCreateResponseDto mainIdea;
    //    깃랩 이름
    String gitlabName;
    //    깃랩 주소
    String gitlab_url;
    //    프로젝트 멤버
    List<UserDto> members;
}
