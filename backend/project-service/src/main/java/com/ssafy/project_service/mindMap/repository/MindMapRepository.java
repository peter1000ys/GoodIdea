package com.ssafy.project_service.mindMap.repository;


import com.ssafy.project_service.mindMap.entity.MindMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MindMapRepository extends JpaRepository<MindMap, Long> {
    Optional<MindMap> findByProject_Id(Long projectId);
}
