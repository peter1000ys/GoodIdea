package com.ssafy.project_service.erd.repository;

import com.ssafy.project_service.erd.entity.ERD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ERDRepository extends JpaRepository<ERD, Long> {

}

