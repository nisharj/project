package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.HealthCoach;
import com.examly.springapp.model.PendingCoachRequests;
import com.examly.springapp.repository.HealthCoachRepo;
import com.examly.springapp.repository.PendingCoachRepo;

@Service
public class ApplicationService {

    private final PendingCoachRepo pendingRepo;
    private final HealthCoachRepo coachRepo;

    public ApplicationService(PendingCoachRepo pendingRepo, HealthCoachRepo coachRepo) {
        this.pendingRepo = pendingRepo;
        this.coachRepo = coachRepo;
    }

    public PendingCoachRequests applyCoach(PendingCoachRequests coach) {
        return pendingRepo.save(coach);
    }

    public List<PendingCoachRequests> getPendingCoaches() {
        return pendingRepo.findAll();
    }

    public HealthCoach acceptCoach(Long id) {
        PendingCoachRequests pending = pendingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        HealthCoach coach = new HealthCoach();
        coach.setName(pending.getName());
        coach.setSpecialization(pending.getSpecialization());
        coach.setCertification(pending.getCertification());
        coach.setExperience(pending.getExperience());
        coach.setPhoneNumber(pending.getPhoneNumber());
        coach.setStatus(HealthCoach.Status.ACCEPTED);

        HealthCoach saved = coachRepo.save(coach);
        pendingRepo.deleteById(id);
        return saved;
    }

    public void rejectCoach(Long id) {
        pendingRepo.deleteById(id);
    }
}
