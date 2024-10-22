package com.ssafy.goodIdea.req.entity;

import com.ssafy.goodIdea.common.entity.BaseTime;
import com.ssafy.goodIdea.reqDocs.entity.ReqDocs;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Req extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "req_id")
    Long id;

    String url;
    String domain;
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reqDocs_id")
    ReqDocs reqDocsId;
}
