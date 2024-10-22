package com.ssafy.goodIdea.keyword.repository;

import com.ssafy.goodIdea.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
}
