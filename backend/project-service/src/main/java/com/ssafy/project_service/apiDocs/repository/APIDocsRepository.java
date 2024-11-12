package com.ssafy.project_service.apiDocs.repository;


import com.ssafy.project_service.apiDocs.entity.APIDocs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface APIDocsRepository extends JpaRepository<APIDocs, Long> {

}
