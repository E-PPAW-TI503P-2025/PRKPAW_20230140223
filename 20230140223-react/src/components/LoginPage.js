// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // mencegah reload halaman
    // NANTI di sini kita panggil API /api/auth/login
    console.log('Login dengan:', { email, password });
    setMessage('Ini contoh login dummy (belum terhubung ke backend).');

    // contoh: setelah "berhasil" login, arahkan ke dashboard
    // navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', textAlign: 'left' }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px' }}>
          Login
        </button>
      </form>

      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  );
}

export default LoginPage;
