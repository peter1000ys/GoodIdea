package com.ssafy.project_service.project.repository;


import com.ssafy.project_service.project.entity.Project;
import com.ssafy.project_service.project.entity.ProjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByProjectType(ProjectType projectType);
}
