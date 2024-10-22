package com.ssafy.goodIdea.comment.repository;

import com.ssafy.goodIdea.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
