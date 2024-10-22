package com.ssafy.goodIdea.erd.entity;

import com.ssafy.goodIdea.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ERD {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "erd_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id")
    Idea idea;

//    ERD 코드
    String code;
}
