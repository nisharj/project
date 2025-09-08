import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";

export default function Notification() {
  const [coaches, setCoaches] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null); // store clicked app
  const [selectedType, setSelectedType] = useState(""); // coach or client

  const fetchCoaches = async () => {
    try {
      const res = await fetch("http://localhost:8080/applications/getPendingCoaches");
      if (!res.ok) throw new Error("Failed to fetch coaches");
      const data = await res.json();
      setCoaches(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching coaches");
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost:8080/client/getPendingClients");
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching clients");
    }
  };

  const handleAction = async (type, id, action) => {
    try {
      let url = "";

      if (type === "coach") {
        url =
          action === "accept"
            ? `http://localhost:8080/applications/getPendingCoaches/${id}/accept`
            : `http://localhost:8080/applications/getPendingCoaches/${id}/reject`;
      } else {
        url =
          action === "accept"
            ? `http://localhost:8080/client/getPendingClients/${id}/accept`
            : `http://localhost:8080/client/getPendingClients/${id}/reject`;
      }

      const res = await fetch(url, { method: "PUT" });
      if (!res.ok) throw new Error("Failed to update application");

      alert(`${type} application ${action}ed successfully`);
      type === "coach" ? fetchCoaches() : fetchClients();
    } catch (err) {
      console.error(err);
      alert("Error updating application: " + err.message);
    }
  };

  const handleDetails = (app, type) => {
    setSelectedApp(app);
    setSelectedType(type);
    const modal = new window.bootstrap.Modal(
      document.getElementById("detailsModal")
    );
    modal.show();
  };

  useEffect(() => {
    Promise.all([fetchCoaches(), fetchClients()]).finally(() =>
      setLoading(false)
    );
  }, []);

  if (loading) return <p className="text-center mt-5">Loading notifications...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #d4fc79, #96e6a1)",
        paddingBottom: "40px",
      }}
    >
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Admin Notifications</h2>

        {/* Coaches Section */}
        <div className="mb-5">
          <h4 className="mb-3">
            Coach Applications{" "}
            <span className="badge bg-primary">{coaches.length}</span>
          </h4>
          {coaches.length === 0 ? (
            <div className="alert alert-success">No pending coach applications 🎉</div>
          ) : (
            <div className="row">
              {coaches.map((app) => (
                <div key={`coach-${app.id}`} className="col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{app.name}</h5>
                      <p className="card-text mb-1">
                        <strong>Specialization:</strong> {app.specialization}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Experience:</strong> {app.experience} years
                      </p>
                      <p className="card-text mb-3">
                        <strong>Phone:</strong> {app.phoneNumber}
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAction("coach", app.id, "accept")}
                        >
                          ✅ Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleAction("coach", app.id, "reject")}
                        >
                          ❌ Reject
                        </button>
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleDetails(app, "coach")}
                        >
                          📋 Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clients Section */}
        <div>
          <h4 className="mb-3">
            Client Applications{" "}
            <span className="badge bg-primary">{clients.length}</span>
          </h4>
          {clients.length === 0 ? (
            <div className="alert alert-success">No pending client applications</div>
          ) : (
            <div className="row">
              {clients.map((app) => (
                <div key={`client-${app.id}`} className="col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{app.fullName}</h5>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {app.email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Phone:</strong> {app.phone}
                      </p>
                      <p className="card-text mb-3">
                        <strong>Goals:</strong> {app.goals}
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAction("client", app.id, "accept")}
                        >
                          ✅ Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleAction("client", app.id, "reject")}
                        >
                          ❌ Reject
                        </button>
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleDetails(app, "client")}
                        >
                          📋 Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="detailsModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Application Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedApp ? (
                <>
                  {selectedType === "coach" ? (
                    <>
                      <p><strong>Name:</strong> {selectedApp.name}</p>
                      <p><strong>Specialization:</strong> {selectedApp.specialization}</p>
                      <p><strong>Certification:</strong> {selectedApp.certification}</p>
                      <p><strong>Experience:</strong> {selectedApp.experience} years</p>
                      <p><strong>Phone:</strong> {selectedApp.phoneNumber}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Name:</strong> {selectedApp.fullName}</p>
                      <p><strong>Email:</strong> {selectedApp.email}</p>
                      <p><strong>Phone:</strong> {selectedApp.phone}</p>
                      <p><strong>Goals:</strong> {selectedApp.goals}</p>
                      <p><strong>Fitness Level:</strong> {selectedApp.fitnessLevel}</p>
                      <p><strong>Location:</strong> {selectedApp.location}</p>
                    </>
                  )}
                </>
              ) : (
                <p>No details available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
