package com.ssafy.goodIdea.idea.entity;

import com.ssafy.goodIdea.common.entity.BaseTime;
import com.ssafy.goodIdea.project.entity.Project;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Idea extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idea_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "project_id" , nullable = false)
    private Project project;

    @Column(nullable = true)
    private String serviceName; // 서비스명

    @Column(length = 1000, nullable = true)
    private String background; // 기획 배경

    @Column(length = 1000, nullable = true)
    private String introduction; // 서비스 소개

    @Column(length = 1000, nullable = true)
    private String target; // 서비스 타겟

    @Column(length = 1000, nullable = true)
    private String expectedEffect; // 기대효과

    @Builder
    public Idea(Project project, String serviceName, String background, String introduction, String target, String expectedEffect) {
        this.project = project;
        this.serviceName = serviceName;
        this.background = background;
        this.introduction = introduction;
        this.target = target;
        this.expectedEffect = expectedEffect;
    }

}
