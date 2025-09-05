import React, { useEffect, useState } from "react";
import Navbar from './NavBar';

export default function Notification() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch('http://localhost:8080/applications/getPendingCoaches');
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const url =
        action === "accept"
          ? `http://localhost:8080/applications/getPendingCoaches/${id}/accept`
          : `http://localhost:8080/applications/getPendingCoaches/${id}/reject`;


      const res = await fetch(url, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to update application");

      alert(`Application ${action}ed successfully`);
      fetchApplications(); 
    } catch (err) {
      console.error(err);
      alert("Error updating application: " + err.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Coach Applications</h3>
        {applications.length === 0 ? (
          <p>No pending applications.</p>
        ) : (
          <ul className="list-group">
            {applications.map((app) => (
              <li
                key={app.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{app.name}</strong> ({app.specialization})
                </div>
                <div>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(app.id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleAction(app.id, "reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() =>
                      alert(
                        `Name: ${app.name}\nSpecialization: ${app.specialization}\nCertification: ${app.certification}\nExperience: ${app.experience} years\nPhone: ${app.phoneNumber}`
                      )
                    }
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
