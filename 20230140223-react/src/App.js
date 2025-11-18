// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigasi sederhana (bisa kamu hapus nanti kalau tidak perlu) */}
        <nav style={{ padding: '12px 24px', backgroundColor: '#f3f4f6' }}>
          <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* default: kalau buka "/" langsung arahkan ke halaman login */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
