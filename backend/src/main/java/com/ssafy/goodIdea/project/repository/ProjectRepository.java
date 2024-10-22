package com.ssafy.goodIdea.project.repository;

import com.ssafy.goodIdea.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
