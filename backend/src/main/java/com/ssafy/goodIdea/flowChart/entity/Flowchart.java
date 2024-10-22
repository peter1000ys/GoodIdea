package com.ssafy.goodIdea.flowChart.entity;

import com.ssafy.goodIdea.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Flowchart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flowchart_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id")
    Idea idea;

//    Flowchart 코드
    String code;
}
