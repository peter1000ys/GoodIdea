package com.ssafy.goodIdea.api.entity;

import com.ssafy.goodIdea.apiDocs.entity.APIDocs;
import com.ssafy.goodIdea.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class API extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apidocs_id")
    APIDocs apiDocs;

    @Enumerated(value = EnumType.STRING)
    MethodType methodType;

    String url;
    String domain;
    String description;
}
