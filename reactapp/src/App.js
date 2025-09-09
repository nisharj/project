import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import RegisterForm from './components/RegisterForm'; 
import DisplayHealthCoach from './components/DisplayHealthCoach';
import DisplayClients from './components/DisplayClients';
import Footer from './components/Footer';
import Notifications from './components/Notification';
import ClientRequestForm from './components/ClientRequestForm';
import CoachRequestForm from './components/CoachRequestForm';
import Login from './components/Login.jsx';        
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/getAllClients"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <DisplayClients />
              </PrivateRoute>
            }/>

          <Route path="/getAllCoaches" element={ 
            <PrivateRoute roles={["ADMIN"]}>
              <DisplayHealthCoach />
            </PrivateRoute>
          } />

          <Route path="/notifications" element={
            <PrivateRoute roles={["ADMIN"]}>
              <Notifications />
            </PrivateRoute>
          } />

          <Route path="/clientRequestForm" element={<ClientRequestForm />} />
          <Route path="/coachRequestForm" element={<CoachRequestForm />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
