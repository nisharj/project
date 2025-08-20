import React, { useEffect, useState } from 'react';

export default function DisplayHealthCoach() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/getAllCoaches')
      .then(res => res.json())
      .then(data => setCoaches(data))
      .catch(() => setCoaches([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-3">
      <h3 className="mb-3">Submitted Health Coach Applications</h3>
      {loading ? <div>Loading...</div> : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Certification</th>
                <th>Experience</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.specialization}</td>
                  <td>{c.certification}</td>
                  <td>{c.experience}</td>
                  <td>{c.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {coaches.length === 0 && <div className="alert alert-info">No applications yet.</div>}
        </div>
      )}
    </div>
  );
}
