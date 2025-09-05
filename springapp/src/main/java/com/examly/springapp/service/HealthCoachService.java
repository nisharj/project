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

    public HealthCoach  addCoachRequest(HealthCoach coach){
        if(coach.getExperience() < 0){
            throw new InvalidExperienceException("Experience connot be negative");
        }
        coach.setStatus((HealthCoach.Status.PENDING));
        return coachRepo.save(coach);
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

     public List<HealthCoach> getPendingCoaches() {
        return coachRepo.findByStatus(HealthCoach.Status.PENDING);
    }

    public HealthCoach acceptCoach(Long id) {
        HealthCoach coach = coachRepo.findById(id).orElseThrow(() -> new RuntimeException("Coach not found"));
        coach.setStatus(HealthCoach.Status.ACCEPTED);
        return coachRepo.save(coach);
    }

    public HealthCoach rejectCoach(Long id) {
        HealthCoach coach = coachRepo.findById(id).orElseThrow(() -> new RuntimeException("Coach not found"));
        coach.setStatus(HealthCoach.Status.REJECTED);
        return coachRepo.save(coach);
    }

    public boolean deleteCoach(Long id) {
        if (coachRepo.existsById(id)) {
            coachRepo.deleteById(id);
            return true;
        }
        return false;
    }
}
