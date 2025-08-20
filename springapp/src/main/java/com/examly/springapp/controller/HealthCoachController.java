package com.examly.springapp.controller;

import com.examly.springapp.exception.InvalidExperienceException;
import com.examly.springapp.model.HealthCoach;
import com.examly.springapp.service.HealthCoachService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class HealthCoachController {

    private final HealthCoachService service;

    public HealthCoachController(HealthCoachService service) {
        this.service = service;
    }

    @PostMapping("/addCoach")
    public ResponseEntity<HealthCoach> addCoach(@RequestBody HealthCoach coach) {
        HealthCoach saved = service.addCoach(coach);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/getAllCoaches")
    public ResponseEntity<List<HealthCoach>> getAllCoaches() {
        return ResponseEntity.ok(service.getAllCoaches());
    }

    @ExceptionHandler(InvalidExperienceException.class)
    public ResponseEntity<String> handleInvalidExperience(InvalidExperienceException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Experience cannot be negative");
    }
}
