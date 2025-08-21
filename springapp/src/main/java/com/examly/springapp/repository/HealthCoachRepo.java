package com.examly.springapp.repository;

import com.examly.springapp.model.HealthCoach;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthCoachRepo extends JpaRepository<HealthCoach, Long> {
}
