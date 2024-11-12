package com.ssafy.project_service.flowChart.repository;

import com.ssafy.project_service.flowChart.entity.Flowchart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowChartRepository extends JpaRepository<Flowchart, Long> {

}

