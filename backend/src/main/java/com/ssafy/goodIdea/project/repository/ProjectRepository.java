package com.ssafy.goodIdea.project.repository;

import com.ssafy.goodIdea.project.entity.Project;
import com.ssafy.goodIdea.project.entity.ProjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p " +
            "JOIN UserProject up ON up.project.id = p.id " +  // UserProject를 통해 JOIN
            "JOIN up.user u " +                              // User와 JOIN
            "WHERE u.id = :userId AND p.projectType = :projectType")
    Optional<Project> findByUserIdAndProjectType(
            @Param("userId") Long userId,
            @Param("projectType") ProjectType projectType
    );
}
