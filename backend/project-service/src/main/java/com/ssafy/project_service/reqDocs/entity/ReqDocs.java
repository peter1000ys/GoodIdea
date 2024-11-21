package com.ssafy.project_service.reqDocs.entity;


import com.ssafy.project_service.common.entity.BaseTime;
import com.ssafy.project_service.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ReqDocs extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reqdocs_id")
    private Long reqDocsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;

    @Builder
    public ReqDocs(Idea idea) {
        this.idea = idea;
    }
}
