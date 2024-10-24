package com.ssafy.goodIdea.user.dto;

import com.ssafy.goodIdea.user.entity.LocationType;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserDto {
    private Long id;
    private String username;
    private RoleType roleType;
    private LocationType locationType;
    private Integer grade;

    @Builder
    public UserDto(Long id, String username, RoleType roleType, LocationType locationType, Integer grade) {
        this.id = id;
        this.username = username;
        this.grade = grade;
        this.locationType = locationType;
        this.roleType = roleType;
    }

}
