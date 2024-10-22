package com.ssafy.goodIdea.userProject.entity;

import com.ssafy.goodIdea.common.entity.BaseTime;
import com.ssafy.goodIdea.project.entity.Project;
import com.ssafy.goodIdea.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserProject extends BaseTime {
    @Id
    @Column(name = "user_project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    Project project;
}
