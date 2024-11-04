package com.ssafy.goodIdea.comment.repository;

import com.ssafy.goodIdea.comment.entity.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByIdeaId(Long ideaId);
}
