import React, { useEffect, useState } from "react";
import ClientProfile from "./ClientProfile";

export default function DisplayClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8080/getAllClient")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched clients:", data);
        setClients(data);
      })
      .catch((err) => {
        console.error("Error fetching clients:", err);
        setClients([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
      fetch(`http://localhost:8080/deleteClient/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setClients((prevClients) => prevClients.filter((c) => c.id !== id));
          } else {
            alert("Failed to delete client.");
          }
        })
        .catch((err) => {
          console.error("Error deleting client:", err);
          alert("An error occurred while deleting.");
        });
  };

  return (
    <div className="mt-4">
      <h2 className="text-center text-primary mb-4">
        Submitted Client Registrations
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="container" style={{ marginBottom: "100px" }}>
          <div className="table-responsive">
            <table className="table table-bordered shadow-sm">
              <thead className="table-primary text-center">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                  <th>Location</th>
                  <th>Goals</th>
                  <th>Profile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <tr key={i}>
                    <td>{c.fullName}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.gender}</td>
                    <td>{c.location}</td>
                    <td>{c.goals}</td>
                    <td>
                      <button className="btn btn-link text-decoration-none mx-3 text-primary" onClick={() => setUserProfile(c)}>
                        View
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm mx-5 px-3" onClick={() => setConfirmDelete(c)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {clients.length === 0 && (
            <div className="alert alert-info text-center">
              No client registrations yet.
            </div>
          )}
        </div>
      )}

      {userProfile && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Client Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setUserProfile(null)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Pass userProfile to ClientProfile */}
                <ClientProfile client={userProfile} />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setUserProfile(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setConfirmDelete(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Are you sure you want to delete <b>{confirmDelete.fullName}</b>?</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(confirmDelete.id);
                    setConfirmDelete(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
