package com.ssafy.goodIdea.comment.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.ssafy.goodIdea.common.entity.BaseTime;
import com.ssafy.goodIdea.idea.entity.Idea;
import com.ssafy.goodIdea.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "comment_content", nullable = false)
    private String commentContent; // 댓글 내용

    @Column(name = "rating", nullable = false)
    private Float rating; // 별점

    @Builder
    public Comment(Idea idea, User user, String commentContent, float rating) {
        if (rating < 0 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 0 and 5.");
        }
        this.idea = idea;
        this.user = user;
        this.commentContent = commentContent;
        this.rating = rating;
<<<<<<< HEAD
    }

    /*
     * 댓글 수정
     */
    public void updateComment(String commentContent, float rating) {
        this.commentContent = commentContent;
        this.rating = rating;
=======
>>>>>>> bd4a0137498d3e30b8cd1300d608ec65827e35e6
    }

    /*
     * 댓글 수정
     */
    public void updateComment(String commentContent, float rating) {
        this.commentContent = commentContent;
        this.rating = rating;
    }

}
