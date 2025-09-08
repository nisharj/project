package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "coach_requests")
public class PendingCoachRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private String certification;
    private int experience;
    private String phoneNumber;

    private String status = "PENDING";

    public PendingCoachRequests(){}

    public PendingCoachRequests(String name, String specialization, String certification, int experience, String phoneNumber){
        this.name = name;
        this.specialization = specialization;
        this.certification = certification;
        this.experience = experience;
        this.phoneNumber = phoneNumber;
    }

    public void setId(long id) { this.id = id; }
    public long getId() { return id; }

    public void setName(String name){this.name = name; }
    public String getName() { return name; }

    public void setSpecialization(String specialization){this.specialization = specialization; }
    public String getSpecialization() { return specialization; }

    public void setCertification(String certification){this.certification = certification; }
    public String getCertification(){ return certification; }

    public void setExperience(int experience){this.experience = experience; }
    public int getExperience(){ return experience; }

    public void setPhoneNumber(String phoneNumber){this.phoneNumber = phoneNumber; }
    public String getPhoneNumber(){ return phoneNumber; }    

    public void setStatus(String status) { this.status = status; }
    public String getStatus(){ return status; }
}
