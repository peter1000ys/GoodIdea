package com.ssafy.project_service.mongodb.repository;
import com.ssafy.project_service.mongodb.entity.MongoIdea;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface MongoIdeaRepository extends MongoRepository<MongoIdea, ObjectId> {
    @Query(value = "{ _id: ?0}", fields = "{ idea_erd:  1}")
    Optional<MongoIdea> findErdById(Long projectId);

}
