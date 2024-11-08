package com.ssafy.gateway_service.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "auth-service")
public interface AuthServiceClient {
    @GetMapping("/api/v1/auth/verify")
    ResponseEntity<?> verify();
}