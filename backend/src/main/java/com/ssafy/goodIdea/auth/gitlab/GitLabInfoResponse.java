package com.ssafy.goodIdea.auth.gitlab;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.goodIdea.auth.OAuthInfoResponse;
import com.ssafy.goodIdea.user.entity.OAuthProvider;
import com.ssafy.goodIdea.user.entity.RoleType;
import lombok.Data;
import lombok.Getter;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GitLabInfoResponse implements OAuthInfoResponse {

    private String id;
    private String username;
    private String email;
    private String name;
    private RoleType roleType;

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public RoleType getRoleType() {
        return roleType;
    }

    @Override
    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }

    @Override
    public OAuthProvider getOAuthProvider() {
        return OAuthProvider.GitLab;
    }
}
