import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavbarForm";

export default function RequestForm() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [form, setForm] = useState({
    // Basic Personal Information
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    location: "",

    // Health & Lifestyle Information
    height: "",
    weight: "",
    fitnessLevel: "",
    medicalConditions: "",
    allergies: "",
    sleep: "",
    habits: "",

    // Goals & Preferences
    goals: "",
    coachingStyle: "",
    workoutPreferences: "",
    dietaryPreferences: "",
    timeAvailability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = () => {
    let errors = {};

    if (step === 1) {
      if (!form.fullName.trim()) errors.fullName = "Full Name is required";
      if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
        errors.email = "Invalid email";
      if (!form.phone.match(/^[0-9]{10}$/))
        errors.phone = "Phone must be 10 digits";
      if (!form.dob) errors.dob = "Date of Birth is required";
      if (!form.gender) errors.gender = "Select gender";
      if (!form.location.trim()) errors.location = "Location is required";
    }

    if (step === 2) {
      if (!form.height || form.height <= 0)
        errors.height = "Height must be positive";
      if (!form.weight || form.weight <= 0)
        errors.weight = "Weight must be positive";
      if (!form.fitnessLevel.trim())
        errors.fitnessLevel = "Fitness Level is required";
    }

    if (step === 3) {
      if (!form.goals.trim()) errors.goals = "Please enter your goals";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const res = await fetch("http://localhost:8080/addClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to register client");

      const modal = new window.bootstrap.Modal(
        document.getElementById("successModal")
      );
      modal.show();

      setForm({
        fullName: "", email: "", phone: "", dob: "",
        gender: "", location: "", height: "", weight: "",
        fitnessLevel: "", medicalConditions: "", allergies: "",
        sleep: "", habits: "", goals: "",
        coachingStyle: "", workoutPreferences: "",
        dietaryPreferences: "", timeAvailability: ""
      });

      setTimeout(() => {
        modal.hide();
        navigate("/getAllClients");
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Error submitting application: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5" style={{ marginBottom: "100px" }}>
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <h3 className="text-center mb-4">Health Coach Registration</h3>

          <form onSubmit={handleSubmit}>
            {/* Step 1: */}
            {step === 1 && (
              <>
                <h5 className="text-center">Basic Personal Information</h5>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  />
                  {errors.dob && (
                    <div className="invalid-feedback">{errors.dob}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Location / Time Zone</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.location ? "is-invalid" : ""
                    }`}
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={nextStep}
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2: */}
            {step === 2 && (
              <>
                <h5 className="text-center">Health & Lifestyle Information</h5>
                <div className="mb-3">
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    className={`form-control ${errors.height ? "is-invalid" : ""}`}
                  />
                  {errors.height && (
                    <div className="invalid-feedback">{errors.height}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    className={`form-control ${errors.weight ? "is-invalid" : ""}`}
                  />
                  {errors.weight && (
                    <div className="invalid-feedback">{errors.weight}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Current Fitness Level</label>
                  <input
                    type="text"
                    name="fitnessLevel"
                    value={form.fitnessLevel}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.fitnessLevel ? "is-invalid" : ""
                    }`}
                  />
                  {errors.fitnessLevel && (
                    <div className="invalid-feedback">{errors.fitnessLevel}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Medical Conditions</label>
                  <input
                    type="text"
                    name="medicalConditions"
                    value={form.medicalConditions}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Allergies / Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={form.allergies}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sleep Patterns</label>
                  <input
                    type="text"
                    name="sleep"
                    value={form.sleep}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Smoking / Alcohol Habits</label>
                  <input
                    type="text"
                    name="habits"
                    value={form.habits}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 3: */}
            {step === 3 && (
              <>
                <h5 className="text-center">Goals & Preferences</h5>
                <div className="mb-3">
                  <label className="form-label">Health Goals</label>
                  <input
                    type="text"
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    className={`form-control ${errors.goals ? "is-invalid" : ""}`}
                  />
                  {errors.goals && (
                    <div className="invalid-feedback">{errors.goals}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Preferred Coaching Style</label>
                  <input
                    type="text"
                    name="coachingStyle"
                    value={form.coachingStyle}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Workout Preferences</label>
                  <input
                    type="text"
                    name="workoutPreferences"
                    value={form.workoutPreferences}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dietary Preferences</label>
                  <input
                    type="text"
                    name="dietaryPreferences"
                    value={form.dietaryPreferences}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Time Availability</label>
                  <input
                    type="text"
                    name="timeAvailability"
                    value={form.timeAvailability}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div
          className="modal fade"
          id="successModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Application submitted successfully!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
