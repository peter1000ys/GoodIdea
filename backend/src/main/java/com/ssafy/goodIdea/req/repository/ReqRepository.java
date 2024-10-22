package com.ssafy.goodIdea.req.repository;

import com.ssafy.goodIdea.req.entity.Req;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReqRepository extends JpaRepository<Req, Long> {
}
