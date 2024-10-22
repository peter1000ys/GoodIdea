package com.ssafy.goodIdea.planner.entity;

import com.ssafy.goodIdea.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Planner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "planner_id")
    Long id;

//    기획 배경
    String background;
//    서비스 소개
    String introduce;
//    서비스 타겟
    String target;
//    기대효과
    String exception;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id")
    Idea idea;
}
