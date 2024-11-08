package com.ssafy.project_service.comment.entity;


import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.entity.BaseTime;
import com.ssafy.project_service.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Comment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;


    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Setter
    @Transient // 데이터베이스에 저장되지 않도록 설정
    private UserDto user;

    @Column(name = "comment_content", nullable = false)
    private String commentContent; // 댓글 내용

    @Column(name = "rating", nullable = false)
    private Float rating; // 별점

    @Builder
    public Comment(Idea idea, Long userId, String commentContent, float rating) {
        if (rating < 0 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 0 and 5.");
        }
        this.idea = idea;
        this.userId = userId;
        this.commentContent = commentContent;
        this.rating = rating;
    }


    /*
     * 댓글 수정
     */
    public void updateComment(String commentContent, float rating) {
        this.commentContent = commentContent;
        this.rating = rating;
    }
}
