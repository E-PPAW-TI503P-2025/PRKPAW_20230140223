// src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa'); // default
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    try {
      // Kirim data ke backend
      const response = await axios.post(
        'http://localhost:3308/api/auth/register',
        {
          nama,
          email,
          password,
          role,
        }
      );

      // Jika sukses
      setSuccessMsg(response.data.message || 'Registrasi berhasil');

      // Optional: sedikit delay biar user sempat lihat pesan sukses
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (err) {
      // Tangani error dari backend
      const msg =
        err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register Akun Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Irfansyah"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="nama@mail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Tombol submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold
                       rounded-md shadow-sm hover:bg-green-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Daftar
          </button>
        </form>

        {/* Pesan error / sukses */}
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
        {successMsg && (
          <p className="mt-4 text-sm text-green-600 text-center">
            {successMsg}
          </p>
        )}

        {/* Link ke login */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
