package com.ssafy.project_service.reqDocs.repository;


import com.ssafy.project_service.reqDocs.entity.ReqDocs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReqDocsRepository extends JpaRepository<ReqDocs, Long> {

}
