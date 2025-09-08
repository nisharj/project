package com.examly.springapp.repository;

import com.examly.springapp.model.PendingClientRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClientRequestRepository extends JpaRepository<PendingClientRequest, Long> {
    List<PendingClientRequest> findByStatus(String status);
}
