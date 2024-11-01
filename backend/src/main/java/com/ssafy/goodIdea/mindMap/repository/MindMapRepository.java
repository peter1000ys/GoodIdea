package com.ssafy.goodIdea.mindMap.repository;

import com.ssafy.goodIdea.mindMap.entity.MindMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MindMapRepository extends JpaRepository<MindMap, Long> {
    Optional<MindMap> findByProject_Id(Long projectId);
}
