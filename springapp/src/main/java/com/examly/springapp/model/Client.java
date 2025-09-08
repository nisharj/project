package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String dob;
    private String gender;
    private String location;

    private String height;
    private String weight;
    private String fitnessLevel;
    private String medicalConditions;
    private String allergies;
    private String sleep;
    private String habits;

    private String goals;
    private String coachingStyle;
    private String workoutPreferences;
    private String dietaryPreferences;
    private String timeAvailability;

    public Client(){}

    public Client(String fullName, String email, String dob, String gender, String location, String height, String weight, String fitnessLevel, String medicalConditions,
    String allergies, String sleep, String habits, String goals, String coachingStyle, String workoutPreferences, String dietaryPreferences, String timeAvailability){
        this.fullName = fullName;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.location = location;
        this.height = height;
        this.weight = weight;
        this.fitnessLevel = fitnessLevel;
        this.medicalConditions = medicalConditions;
        this.allergies =allergies;
        this.sleep =sleep;
        this.habits = habits;
        this.goals = goals;
        this.coachingStyle = coachingStyle;
        this.workoutPreferences = workoutPreferences;
        this.dietaryPreferences = dietaryPreferences;
        this.timeAvailability = timeAvailability;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getFitnessLevel() { return fitnessLevel; }
    public void setFitnessLevel(String fitnessLevel) { this.fitnessLevel = fitnessLevel; }

    public String getMedicalConditions() { return medicalConditions; }
    public void setMedicalConditions(String medicalConditions) { this.medicalConditions = medicalConditions; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public String getSleep() { return sleep; }
    public void setSleep(String sleep) { this.sleep = sleep; }

    public String getHabits() { return habits; }
    public void setHabits(String habits) { this.habits = habits; }

    public String getGoals() { return goals; }
    public void setGoals(String goals) { this.goals = goals; }

    public String getCoachingStyle() { return coachingStyle; }
    public void setCoachingStyle(String coachingStyle) { this.coachingStyle = coachingStyle; }

    public String getWorkoutPreferences() { return workoutPreferences; }
    public void setWorkoutPreferences(String workoutPreferences) { this.workoutPreferences = workoutPreferences; }

    public String getDietaryPreferences() { return dietaryPreferences; }
    public void setDietaryPreferences(String dietaryPreferences) { this.dietaryPreferences = dietaryPreferences; }

    public String getTimeAvailability() { return timeAvailability; }
    public void setTimeAvailability(String timeAvailability) { this.timeAvailability = timeAvailability; }

    public Client(PendingClientRequest req) {
        this.fullName = req.getFullName();
        this.email = req.getEmail();
        this.phone = req.getPhone();
        this.dob = req.getDob();
        this.gender = req.getGender();
        this.location = req.getLocation();
        this.height = req.getHeight();
        this.weight = req.getWeight();
        this.fitnessLevel = req.getFitnessLevel();
        this.medicalConditions = req.getMedicalConditions();
        this.allergies = req.getAllergies();
        this.sleep = req.getSleep();
        this.habits = req.getHabits();
        this.goals = req.getGoals();
        this.coachingStyle = req.getCoachingStyle();
        this.workoutPreferences = req.getWorkoutPreferences();
        this.dietaryPreferences = req.getDietaryPreferences();
        this.timeAvailability = req.getTimeAvailability();
    }

}
