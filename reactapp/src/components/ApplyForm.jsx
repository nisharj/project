import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';

export default function ApplyForm() {
    const [form, setForm] = useState({ name: '', specialization: '', certification: '', experience: '', phoneNumber: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.specialization.trim()) e.specialization = 'Specialization is required';
        if (!form.certification.trim()) e.certification = 'Certification is required';
        if (form.experience === '') e.experience = 'Experience is required';
        else if (isNaN(form.experience) || Number(form.experience) < 0) e.experience = 'Experience must be a valid number or at least 0';
        if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone Number is required';
        else if (!/^\+?\d{7,15}$/.test(form.phoneNumber.trim())) e.phoneNumber = 'Invalid phone number format';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setSubmitting(true);
            const res = await fetch('http://localhost:8080/addCoach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    specialization: form.specialization.trim(),
                    certification: form.certification.trim(),
                    experience: Number(form.experience),
                    phoneNumber: form.phoneNumber.trim()
                })
            });
            if (!res.ok) throw new Error(await res.text() || 'Failed to submit');
            const modal = new window.bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
            setForm({ name: '', specialization: '', certification: '', experience: '', phoneNumber: '' });
            setTimeout(() => { modal.hide(); navigate('/getAllCoaches'); }, 1000);
        } catch (err) {
            console.error(err);
            alert('Error submitting application: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
      <>
        <Navbar />
        <div className="container d-flex justify-content-center mt-5" style={{marginBottom:"50px", paddingBottom:"60px"}}>
          <div className="card shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="card-body">
              <h3 className="mb-4 text-center">Apply to Become a Health Coach</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input id="name" name="name" type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={handleChange} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="specialization" className="form-label">Specialization:</label>
                  <input id="specialization" name="specialization" type="text" className={`form-control ${errors.specialization ? 'is-invalid' : ''}`} value={form.specialization} onChange={handleChange} />
                  {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="certification" className="form-label">Certification:</label>
                  <input id="certification" name="certification" type="text" className={`form-control ${errors.certification ? 'is-invalid' : ''}`} value={form.certification} onChange={handleChange} />
                  {errors.certification && <div className="invalid-feedback">{errors.certification}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">Experience (in years):</label>
                  <input id="experience" name="experience" type="number" className={`form-control ${errors.experience ? 'is-invalid' : ''}`} value={form.experience} onChange={handleChange} />
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>
                
                
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                  <input id="phoneNumber" name="phoneNumber" type="text" className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} value={form.phoneNumber} onChange={handleChange} />
                  {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                </div>
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={() => window.history.back()} disabled={submitting}>Back</button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="modal fade" id="successModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">Application submitted successfully!</div>
            </div>
          </div>
        </div>
      </>
);

}
