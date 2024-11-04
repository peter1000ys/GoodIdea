package com.ssafy.goodIdea.idea.repository;

import com.ssafy.goodIdea.idea.entity.Idea;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findByProjectId(Long projectId);
}
