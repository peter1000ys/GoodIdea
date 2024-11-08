package com.ssafy.auth_service.auth.gitlab;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class GitLabProjectResponseDto {

    @JsonProperty("id")
    private Long project_id;

    private String name;

    private String name_with_namespace;

    @JsonProperty("web_url")
    private String webUrl;

    @JsonProperty("created_at")
    private String createdAt;


}
