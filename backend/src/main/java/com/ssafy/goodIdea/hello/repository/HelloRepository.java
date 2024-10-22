package com.ssafy.goodIdea.hello.repository;

import com.ssafy.goodIdea.hello.entity.Hello;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloRepository extends JpaRepository<Hello, Long> {
}
