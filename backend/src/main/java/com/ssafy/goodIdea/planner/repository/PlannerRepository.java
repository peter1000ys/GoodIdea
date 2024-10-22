package com.ssafy.goodIdea.planner.repository;

import com.ssafy.goodIdea.planner.entity.Planner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlannerRepository extends JpaRepository<Planner, Long> {
}
