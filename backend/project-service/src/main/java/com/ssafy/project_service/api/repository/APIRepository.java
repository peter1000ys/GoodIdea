package com.ssafy.project_service.api.repository;


import com.ssafy.project_service.api.entity.API;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface APIRepository extends JpaRepository<API, Long> {

}

