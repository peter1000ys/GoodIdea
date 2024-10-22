package com.ssafy.goodIdea.hello.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HelloResponseDto {
    Long hello_id;
    String content;
}
