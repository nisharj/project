
export default function ClientProfile({ client }) {
  if (!client) return null;

  return (
    <div className="p-3">
      <div className="mb-3 border-bottom pb-2">
        <h4 className="mb-1">{client.fullName}</h4>
        <small className="text-muted">{client.email}</small>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h6 className="text-primary">Personal Info</h6>
          <p><strong>Phone:</strong> {client.phone}</p>
          <p><strong>Date of Birth:</strong> {client.dob}</p>
          <p><strong>Gender:</strong> {client.gender}</p>
          <p><strong>Location:</strong> {client.location}</p>
        </div>

        <div className="col-md-6">
          <h6 className="text-primary">Fitness Details</h6>
          <p><strong>Height:</strong> {client.height} cm</p>
          <p><strong>Weight:</strong> {client.weight} kg</p>
          <p><strong>Fitness Level:</strong> {client.fitnessLevel}</p>
          <p><strong>Goals:</strong> {client.goals}</p>
        </div>
      </div>

      <hr />

      <h6 className="text-primary">Lifestyle & Preferences</h6>
      <p><strong>Medical Conditions:</strong> {client.medicalConditions}</p>
      <p><strong>Allergies:</strong> {client.allergies || "None"}</p>
      <p><strong>Sleep Pattern:</strong> {client.sleep}</p>
      <p><strong>Habits:</strong> {client.habits}</p>
      <p><strong>Coaching Style:</strong> {client.coachingStyle}</p>
      <p><strong>Workout Preferences:</strong> {client.workoutPreferences}</p>
      <p><strong>Dietary Preferences:</strong> {client.dietaryPreferences}</p>
      <p><strong>Time Availability:</strong> {client.timeAvailability}</p>
    </div>
  );
}
