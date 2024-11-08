package com.ssafy.project_service.userProject.entity;

import com.ssafy.project_service.common.dto.UserDto;
import com.ssafy.project_service.common.entity.BaseTime;
import com.ssafy.project_service.project.entity.Project;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserProject extends BaseTime {
    @Id
    @Column(name = "user_project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Setter
    @Transient // 데이터베이스에 저장되지 않도록 설정
    private UserDto user;

    @Builder
    public UserProject(Long userId, Project project) {
        this.userId = userId;
        this.project = project;
    }

}
