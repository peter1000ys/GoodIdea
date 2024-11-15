package com.ssafy.goodIdea.common.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DocumentOperationDto {
    private Long ideaId;
    private String documentType;
    private String operation;
    private String data;
    private String content;
    private String version;
    private String timestamp;
}
