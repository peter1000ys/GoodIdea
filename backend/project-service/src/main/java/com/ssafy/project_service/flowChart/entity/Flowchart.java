package com.ssafy.project_service.flowChart.entity;


import com.ssafy.project_service.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Flowchart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flowchart_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;

    @Column(nullable = true)
    private String code; // Flowchart 코드

    @Builder
    public Flowchart(Idea idea, String code) {
        this.idea = idea;
        this.code = code;
    }
}
