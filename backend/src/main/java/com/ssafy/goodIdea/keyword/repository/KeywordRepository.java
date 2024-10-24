package com.ssafy.goodIdea.keyword.repository;

import com.ssafy.goodIdea.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findAllByMindMap_Id(Long mindMapId);
}
