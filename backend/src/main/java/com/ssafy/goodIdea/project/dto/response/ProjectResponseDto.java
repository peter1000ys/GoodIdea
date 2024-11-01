package com.ssafy.goodIdea.project.dto.response;

import com.ssafy.goodIdea.project.entity.ProjectType;
import com.ssafy.goodIdea.user.dto.UserDto;
import com.ssafy.goodIdea.user.entity.User;
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
    //    프로젝트 이름
    String name;
    //    프로젝트 분류 ( 관통, 공통, 특화, 자율 )
    ProjectType projectType;
    //    프로젝트 설명
    String description;
    //    깃랩 이름
    String gitlab_name;
    //    깃랩 주소
    String gitlab_url;
    //    프로젝트 멤버
    List<UserDto> members;
}
