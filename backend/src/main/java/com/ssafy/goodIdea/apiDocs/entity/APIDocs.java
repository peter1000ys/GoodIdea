package com.ssafy.goodIdea.apiDocs.entity;

import com.ssafy.goodIdea.api.entity.API;
import com.ssafy.goodIdea.common.entity.BaseTime;
import com.ssafy.goodIdea.idea.entity.Idea;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class APIDocs extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apidocs_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    API api;
}
