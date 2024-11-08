package com.ssafy.project_service.req.repository;


import com.ssafy.project_service.req.entity.Req;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReqRepository extends JpaRepository<Req, Long> {
}
