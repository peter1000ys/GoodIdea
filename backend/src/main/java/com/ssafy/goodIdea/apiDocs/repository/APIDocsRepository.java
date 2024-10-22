package com.ssafy.goodIdea.apiDocs.repository;

import com.ssafy.goodIdea.apiDocs.entity.APIDocs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface APIDocsRepository extends JpaRepository<APIDocs, Long> {

}
