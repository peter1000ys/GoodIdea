package com.ssafy.project_service.keyword.entity;



import com.ssafy.project_service.common.entity.BaseTime;
import com.ssafy.project_service.mindMap.entity.MindMap;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Keyword extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private Long id;

    private String content; // 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mindMap_id")
    private MindMap mindMap;

    @Builder
    public Keyword(String content, MindMap mindMap) {
        this.content = content;
        this.mindMap = mindMap;
    }
}
