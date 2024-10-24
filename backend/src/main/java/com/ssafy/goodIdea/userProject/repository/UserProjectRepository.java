package com.ssafy.goodIdea.userProject.repository;

import com.ssafy.goodIdea.project.entity.ProjectType;
import com.ssafy.goodIdea.userProject.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserProjectRepository extends JpaRepository<UserProject, Long> {
    @Query("SELECT up FROM UserProject up JOIN FETCH up.user u JOIN FETCH up.project p WHERE u.id = :userId")
    List<UserProject> findAllByUserId(@Param("userId") Long userId);
    @Query("SELECT up FROM UserProject up JOIN FETCH up.user u JOIN FETCH up.project p WHERE p.id = :projectId")
    List<UserProject> findAllByProjectId(@Param("projectId") Long projectId);
    Optional<UserProject> findByUser_IdAndProject_Id(Long userId, Long projectId);

    @Query("SELECT up FROM UserProject up JOIN up.user u JOIN up.project p WHERE u.id = :userId AND u.grade = :grade AND p.projectType = :projectType")
    List<UserProject> findByUserIdAndGradeAndProjectType(@Param("userId") Long userId, @Param("grade") Integer grade, @Param("projectType") ProjectType projectType);

    @Query("SELECT up FROM UserProject up JOIN up.user u JOIN up.project p WHERE u.id = :userId AND u.grade = :grade")
    List<UserProject> findByUserIdAndGrade(@Param("userId") Long userId, @Param("grade") Integer grade);

    @Query("SELECT up FROM UserProject up JOIN up.user u JOIN up.project p WHERE u.id = :userId AND p.projectType = :projectType")
    List<UserProject> findByUserIdAndProjectType(@Param("userId") Long userId, @Param("projectType") ProjectType projectType);

    @Query("SELECT up FROM UserProject up JOIN up.user u JOIN up.project p WHERE u.id = :userId")
    List<UserProject> findByUserId(@Param("userId") Long userId);
}
