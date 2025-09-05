package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class HealthCoach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private String certification;
    private int experience;
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    public enum Status {
        PENDING, ACCEPTED, REJECTED
    }

    public HealthCoach() {}

    public HealthCoach(String name, String specialization, String certification, int experience, String phoneNumber) {
        this.name = name;
        this.specialization = specialization;
        this.certification = certification;
        this.experience = experience;
        this.phoneNumber = phoneNumber;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public String getCertification() { return certification; }
    public void setCertification(String certification) { this.certification = certification; }
    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
