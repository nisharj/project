import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import RegisterForm from './components/RegisterForm';  // ✅ fixed import name
import DisplayHealthCoach from './components/DisplayHealthCoach';
import DisplayClients from './components/DisplayClients';
import Footer from './components/Footer';
import Notifications from './components/Notification';
import ClientRequestForm from './components/ClientRequestForm';
import CoachRequestForm from './components/CoachRequestForm';
import LoginPage from './components/Login';        
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Protected Route (only ADMIN can view clients) */}
          <Route
            path="/getAllClients"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <DisplayClients />
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/getAllCoaches" element={<DisplayHealthCoach />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/clientRequestForm" element={<ClientRequestForm />} />
          <Route path="/coachRequestForm" element={<CoachRequestForm />} />
        </Routes>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
