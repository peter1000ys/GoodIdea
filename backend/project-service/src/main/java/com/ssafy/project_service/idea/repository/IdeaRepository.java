package com.ssafy.project_service.idea.repository;



import java.util.List;

import com.ssafy.project_service.idea.entity.Idea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findByProjectId(Long projectId);
}
