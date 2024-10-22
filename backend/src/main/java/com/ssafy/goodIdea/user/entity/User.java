package com.ssafy.goodIdea.user.entity;

import com.ssafy.goodIdea.common.entity.BaseTime;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor
public class User extends BaseTime {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Setter
    @Column(nullable = false, unique = true)
    private String username;

    @Setter
    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(value = EnumType.STRING)
    // USER, 컨설턴트
    private RoleType roleType;

    // 지역
    @Enumerated(value = EnumType.STRING)
    private LocationType locationType;

    // 기수
    @Setter
    private Integer grade;

    @Builder
    private User(Long id, String username, String email, RoleType roleType, LocationType locationType, OAuthProvider oAuthProvider) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roleType = roleType;
        this.locationType = locationType;
    }

}