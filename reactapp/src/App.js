import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import DisplayHealthCoach from './components/DisplayHealthCoach';
import Footer from './components/Footer';

function Layout() {
  return (
    <>
      <NavBar />
      <div className="container mt-5 pt-4" style={{ paddingBottom: '80px' }}>
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/getAllCoaches" element={<DisplayHealthCoach />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
