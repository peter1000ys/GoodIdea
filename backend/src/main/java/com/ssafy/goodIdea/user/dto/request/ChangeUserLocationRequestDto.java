package com.ssafy.goodIdea.user.dto.request;

import com.ssafy.goodIdea.user.entity.LocationType;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChangeUserLocationRequestDto {
    LocationType locationType;
    Integer grade;
}
