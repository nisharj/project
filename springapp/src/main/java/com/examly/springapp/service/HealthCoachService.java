package com.examly.springapp.service;

import com.examly.springapp.exception.InvalidExperienceException;
import com.examly.springapp.model.HealthCoach;
import com.examly.springapp.repository.HealthCoachRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HealthCoachService {
    private final HealthCoachRepo repo;

    public HealthCoachService(HealthCoachRepo repo) {
        this.repo = repo;
    }

    public HealthCoach addCoach(HealthCoach coach) {
        if (coach.getExperience() < 0) {
            throw new InvalidExperienceException("Experience cannot be negative");
        }
        return repo.save(coach);
    }

    public List<HealthCoach> getAllCoaches() {
        return repo.findAll();
    }
}
