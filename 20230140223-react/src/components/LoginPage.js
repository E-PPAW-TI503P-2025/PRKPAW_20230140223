// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // state untuk menyimpan input user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state untuk menyimpan pesan error jika login gagal
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // hook untuk pindah halaman

  const handleSubmit = async (e) => {
    e.preventDefault();      // mencegah form submit reload halaman
    setError(null);          // reset error dulu

    try {
      // KIRIM REQUEST KE BACKEND
      const response = await axios.post(
        'http://localhost:3308/api/auth/login', // sesuaikan dengan port server Node.js-mu
        {
          email: email,
          password: password,
        }
      );

      // ambil token dari respons backend
      const token = response.data.token;

      // simpan token ke localStorage agar tetap ada walau di-refresh
      localStorage.setItem('token', token);

      // setelah login berhasil, arahkan user ke dashboard
      navigate('/dashboard');
    } catch (err) {
      // kalau server kirim error (status 4xx/5xx)
      // err.response bisa berisi { message: "..." } dari backend
      const msg = err.response ? err.response.data.message : 'Login gagal';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
