package com.ssafy.goodIdea.hello.service;

import com.ssafy.goodIdea.hello.dto.response.HelloResponseDto;
import com.ssafy.goodIdea.hello.entity.Hello;
import com.ssafy.goodIdea.hello.repository.HelloRepository;
import com.ssafy.goodIdea.common.exception.BaseException;
import com.ssafy.goodIdea.common.exception.ErrorType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HelloService {
    private final HelloRepository helloRepository;

    public HelloResponseDto getHello(Long helloId) {
        Hello hello = helloRepository.findById(helloId).orElseThrow( () -> new BaseException(ErrorType.CAR_NOT_FOUND));
        return HelloResponseDto.builder()
                .hello_id(hello.getId())
                .content(hello.getContent())
                .build();
    }

}
