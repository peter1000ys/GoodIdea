package com.ssafy.project_service.mindMap.entity;


import com.ssafy.project_service.common.entity.BaseTime;
import com.ssafy.project_service.project.entity.Project;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MindMap extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mindMap_id")
    private Long id;

    private String mainKeyword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder
    public MindMap(String mainKeyword, Project project) {
        this.mainKeyword = mainKeyword;
        this.project = project;
    }
}
