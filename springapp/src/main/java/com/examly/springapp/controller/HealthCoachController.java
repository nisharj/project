package com.examly.springapp.controller;

import com.examly.springapp.model.HealthCoach;
import com.examly.springapp.service.HealthCoachService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HealthCoachController {

    private final HealthCoachService coachService;

    public HealthCoachController(HealthCoachService coachService) {
        this.coachService = coachService;
    }

    @PostMapping("/addCoach")
    public ResponseEntity<?> addCoach(@RequestBody HealthCoach coach) {
        try {
            return ResponseEntity.ok(coachService.addCoach(coach));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAllCoaches")
    public List<HealthCoach> getAllCoaches() {
        return coachService.getAllCoaches();
    }
    
}
