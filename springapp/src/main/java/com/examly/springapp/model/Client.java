package com.examly.springapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Personal Information
    private String fullName;
    private String email;
    private String phone;
    private String dob;
    private String gender;
    private String location;

    // Health & Lifestyle Information
    private String height;
    private String weight;
    private String fitnessLevel;
    private String medicalConditions;
    private String allergies;
    private String sleep;
    private String habits;

    // Goals & Preferences
    private String goals;
    private String coachingStyle;
    private String workoutPreferences;
    private String dietaryPreferences;
    private String timeAvailability;

    // Getters & Setters
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
}
