import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/NavBar';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import RegistrationForm from './components/RegisterForm';
import DisplayHealthCoach from './components/DisplayHealthCoach';
import DisplayClients from './components/DisplayClients';
import Footer from './components/Footer';
import Notifications from './components/Notification';
// import NavbarForm from './components/NavbarForm';
import ClientRequestForm from './components/ClientRequestForm';
import CoachRequestForm from './components/CoachRequestForm';
// import Login from './components/login';

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/getAllCoaches" element={<DisplayHealthCoach />} />
            <Route path="/getAllClients" element={<DisplayClients/>} />
            <Route path="/notifications" element={<Notifications/>} />
            <Route path="/clientRequestForm" element={<ClientRequestForm/>} />
            <Route path="/coachRequestForm" element={<CoachRequestForm/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
