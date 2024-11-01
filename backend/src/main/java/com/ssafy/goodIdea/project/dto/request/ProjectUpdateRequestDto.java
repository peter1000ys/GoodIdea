package com.ssafy.goodIdea.project.dto.request;

import com.ssafy.goodIdea.project.entity.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class ProjectUpdateRequestDto {
    ProjectType projectType;
    String description;
    String name;
}
