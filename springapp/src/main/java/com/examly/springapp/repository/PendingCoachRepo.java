package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.PendingCoachRequests;

@Repository
public interface PendingCoachRepo extends JpaRepository<PendingCoachRequests, Long> {}
