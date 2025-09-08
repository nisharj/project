package com.examly.springapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.HealthCoach;
import com.examly.springapp.model.PendingCoachRequests;
import com.examly.springapp.service.ApplicationService;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:8081")
public class CoachApplicationController {

    private final ApplicationService appService;

    public CoachApplicationController(ApplicationService appService) {
        this.appService = appService;
    }

    @PostMapping("/applyCoach")
    public PendingCoachRequests applyCoach(@RequestBody PendingCoachRequests coach) {
        return appService.applyCoach(coach);
    }

    @GetMapping("/getPendingCoaches")
    public List<PendingCoachRequests> getPendingCoaches() {
        return appService.getPendingCoaches();
    }

    @PutMapping("/getPendingCoaches/{id}/accept")
    public HealthCoach acceptCoach(@PathVariable Long id) {

        return appService.acceptCoach(id);
    }

    @PutMapping("/getPendingCoaches/{id}/reject")
    public void rejectCoach(@PathVariable Long id) {
        appService.rejectCoach(id);
    }
}
