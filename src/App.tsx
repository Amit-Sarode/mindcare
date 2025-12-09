/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import { AuthProvider } from './context/Authcontet';
import Header from './component/Header';
import Home from './component/Home';
import Login from './component/Login';
import Dashboard from './component/DashBoard';
import Booking from './component/Booking';
import Footer from './component/Footer'
import AdminDashboard from './component/AdminDashboard';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} /> {/* Reusing login for simplicity */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              
              <Route path="/booking" element={<Booking />} />
              {/* Add Admin Route if needed */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;