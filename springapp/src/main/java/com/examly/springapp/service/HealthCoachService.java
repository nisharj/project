package com.examly.springapp.service;

import com.examly.springapp.exception.InvalidExperienceException;
import com.examly.springapp.model.HealthCoach;
import com.examly.springapp.repository.HealthCoachRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HealthCoachService {

    private final HealthCoachRepo coachRepo;

    public HealthCoachService(HealthCoachRepo coachRepo) {
        this.coachRepo = coachRepo;
    }

    public HealthCoach addCoach(HealthCoach coach) {
        if (coach.getExperience() < 0) {
            throw new InvalidExperienceException("Experience cannot be negative.");
        }
        return coachRepo.save(coach);
    }

    public List<HealthCoach> getAllCoaches() {
        return coachRepo.findAll();
    }
}
