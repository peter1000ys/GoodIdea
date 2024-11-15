package com.ssafy.project_service.liveblocks.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
public class GetUserIdTokenRes{
    String token;
}
