package com.ssafy.project_service.planner.repository;


import com.ssafy.project_service.planner.entity.Planner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlannerRepository extends JpaRepository<Planner, Long> {
}
