package com.ssafy.goodIdea.comment.entity;

import com.ssafy.goodIdea.common.entity.BaseTime;
import com.ssafy.goodIdea.idea.entity.Idea;
import com.ssafy.goodIdea.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Comment extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id")
    Idea idea;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;
//    댓글 내용
    String commentContent;
//    별점
    @Column(nullable = false)
    float rating;
}
