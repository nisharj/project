import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';

export default function DisplayHealthCoach() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="">
      <Navbar />
     
      <h2 className="text-center text-primary mb-4">
        Submitted Health Coach Applications
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
       
        <div className="container">
          <div className="table-responsive">
            <table className="table table-bordered shadow-sm">
              <thead className="table-primary text-center">
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Certification</th>
                  <th>Experience (in years)</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.specialization}</td>
                    <td>{c.certification}</td>
                    <td>{c.experience}</td>
                    <td>{c.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {coaches.length === 0 && (
            <div className="alert alert-info text-center">
              No applications yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
