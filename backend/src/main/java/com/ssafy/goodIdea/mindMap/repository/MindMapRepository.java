package com.ssafy.goodIdea.mindMap.repository;

import com.ssafy.goodIdea.mindMap.entity.MindMap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MindMapRepository extends JpaRepository<MindMap, Long> {
}
