package com.ssafy.project_service.comment.repository;



import com.ssafy.project_service.comment.entity.Comment;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    List<Comment> findByIdeaId(Long ideaId);

    Optional<Comment> findByIdAndUserId(Long commentId, Long userId);

    void deleteByIdAndUserId(Long commentId, Long userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Comment c WHERE c.idea.id = :ideaId")
    void deleteByIdeaId(Long ideaId);
}
