import React, { useEffect, useState } from "react";
import ClientProfile from "./ClientProfile";

export default function DisplayClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <div className="mt-4">
      <h2 className="text-center text-primary mb-4">
        Submitted Client Registrations
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="container" style={{marginBottom: "100px"}}>
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
                    <td><button className="btn btn-link text-decoration-none mx-3 text-primary" onClick={()=> setUserProfile(c)}>View</button></td>
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
    </div>
  );
}
