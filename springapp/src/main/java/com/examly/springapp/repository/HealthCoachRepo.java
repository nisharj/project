package com.examly.springapp.repository;

import com.examly.springapp.model.HealthCoach;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthCoachRepo extends JpaRepository<HealthCoach, Long> {
    List<HealthCoach> findByStatus(HealthCoach.Status status);
}
