package com.ssafy.project_service.keyword.repository;

import com.ssafy.project_service.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findAllByMindMap_Id(Long mindMapId);
}
