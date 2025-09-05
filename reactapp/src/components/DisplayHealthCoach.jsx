import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import Navbar1 from './NavBar1';

export default function DisplayHealthCoach() {
  const role = localStorage.getItem("role");
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterSpecialization, setFilterSpecialization] = useState("");

  useEffect(() => {
    fetch('http://localhost:8080/getAllCoaches', {
      method:"GET", 
      headers: {"Content-Type": "application/json"},
    })
      .then(res => res.json())
      .then(data => setCoaches(data))
      .catch(() => setCoaches([]))
      .finally(() => setLoading(false));
  }, []);


  const handleDelete = (id) => {
    fetch(`http://localhost:8080/deleteCoach/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setCoaches((prevClients) => prevClients.filter((c) => c.id !== id));
        } else {
          alert("Failed to delete client.");
        }
      })
      .catch((err) => {
        console.error("Error deleting client:", err);
        alert("An error occurred while deleting.");
      });
  };

  const filteredCoaches = coaches.filter((c) => {
    const matchesSearch =
      (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.specialization || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.phoneNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.certification || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization = filterSpecialization
      ? (c.specialization || "") === filterSpecialization
      : true;

    return matchesSearch && matchesSpecialization;
  });


  return (
    <div style={{ minHeight:'90vh', paddingBottom:'100px', background: "linear-gradient(to right, #d4fc79, #96e6a1)"}}>
      {role === "ADMIN" && <Navbar />}
      {role!=='ADMIN' && <Navbar1 />}
     
      <h2 className="text-center text-primary mb-4 mt-4">
        Submitted Health Coach Applications
      </h2>

      <div className="container mb-3 d-flex justify-content-between">
        <input
          type="text"
          placeholder="Search by name, specialization, phone, or certification..."
          className="form-control w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="form-select w-25 ms-2"
          value={filterSpecialization}
          onChange={(e) => setFilterSpecialization(e.target.value)}
        >
          <option value="">All Specializations</option>
          <option value="Body Builder">Body Builder</option>
          <option value="Yoga">Yoga</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Mental Health">Mental Health</option>
          <option value="General Fitness">General Fitness</option>
        </select>

      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
       
        <div className="container">
          <div className="table-responsive">
            <table className="table table-bordered shadow-sm">
              <thead className="table-success text-center" >
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Certification</th>
                  <th>Experience (in years)</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoaches.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.specialization}</td>
                    <td>{c.certification}</td>
                    <td>{c.experience}</td>
                    <td>{c.phoneNumber}</td>
                    <td className='text-center'>
                      <button className="btn btn-danger btn-sm mx-5 px-3" onClick={() => setConfirmDelete(c)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCoaches.length === 0 && (
            <div className="alert alert-info text-center">
              No applications yet.
            </div>
          )}
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
                <p>
                  Are you sure you want to delete{" "}
                  <b>{confirmDelete.name}</b>?
                </p>
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
