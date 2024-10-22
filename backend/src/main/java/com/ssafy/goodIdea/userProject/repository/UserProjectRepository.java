package com.ssafy.goodIdea.userProject.repository;

import com.ssafy.goodIdea.userProject.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProjectRepository extends JpaRepository<UserProject, Long> {
}
