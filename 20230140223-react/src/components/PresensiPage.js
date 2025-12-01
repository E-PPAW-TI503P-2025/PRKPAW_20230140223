import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { API_BASE_URL } from "../api";

function PresensiPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // { id, nama, email, role }
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loadingIn, setLoadingIn] = useState(false);
  const [loadingOut, setLoadingOut] = useState(false);
  const [lastRecord, setLastRecord] = useState(null); // simpan data presensi terakhir dari backend

  // Decode token di awal
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = jwtDecode(token);
      setUser({
        id: payload.id,
        nama: payload.nama,
        email: payload.email,
        role: payload.role,
      });
    } catch (err) {
      console.error("Gagal decode token di PresensiPage:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const sendRequest = async (endpoint, setLoading) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/presensi/${endpoint}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend kita sudah mengirim { message, data: {...} }
      setMessage(res.data.message || "Berhasil melakukan presensi.");
      if (res.data.data) {
        setLastRecord(res.data.data);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Terjadi kesalahan saat memproses presensi.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    await sendRequest("check-in", setLoadingIn);
  };

  const handleCheckOut = async () => {
    await sendRequest("check-out", setLoadingOut);
  };

  if (!user) {
    // state loading saat menunggu decode token
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100">
        <p className="text-sm text-slate-300 animate-pulse">
          Menyiapkan halaman presensi...
        </p>
      </div>
    );
  }

  const firstName = user.nama?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl grid md:grid-cols-[1.2fr,1fr] gap-6">
          {/* Kartu utama presensi */}
          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Presensi
            </p>
            <h1 className="mt-3 text-2xl md:text-3xl font-black text-slate-50">
              Lakukan Presensi, {firstName}.
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Gunakan tombol di bawah untuk melakukan{" "}
              <span className="font-semibold text-emerald-300">
                Check-In
              </span>{" "}
              dan{" "}
              <span className="font-semibold text-rose-300">
                Check-Out
              </span>{" "}
              ke sistem presensi terintegrasi Node.js.
            </p>

            {/* Pesan sukses / error */}
            <div className="mt-4 space-y-2 text-sm">
              {message && (
                <div className="rounded-md border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-emerald-300">
                  {message}
                </div>
              )}
              {error && (
                <div className="rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-red-300">
                  {error}
                </div>
              )}
            </div>

            {/* Tombol aksi */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCheckIn}
                disabled={loadingIn || loadingOut}
                className="flex-1 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5
                           text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25
                           hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed
                           transition-colors"
              >
                {loadingIn ? "Memproses Check-In..." : "Check-In"}
              </button>

              <button
                onClick={handleCheckOut}
                disabled={loadingIn || loadingOut}
                className="flex-1 inline-flex items-center justify-center rounded-lg bg-rose-500 px-4 py-2.5
                           text-sm font-semibold text-slate-50 shadow-lg shadow-rose-500/25
                           hover:bg-rose-400 disabled:opacity-60 disabled:cursor-not-allowed
                           transition-colors"
              >
                {loadingOut ? "Memproses Check-Out..." : "Check-Out"}
              </button>
            </div>

            {/* Info presensi terakhir */}
            {lastRecord && (
              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-300">
                <p className="font-semibold text-slate-200 mb-1">
                  Riwayat presensi terakhir:
                </p>
                <p>
                  <span className="text-slate-400">Check-In:</span>{" "}
                  <span className="font-mono">
                    {lastRecord.checkIn || "-"}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Check-Out:</span>{" "}
                  <span className="font-mono">
                    {lastRecord.checkOut || "-"}
                  </span>
                </p>
              </div>
            )}
          </section>

          {/* Panel info samping */}
          <aside className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-xs text-slate-300 space-y-4">
            <div>
              <p className="text-slate-200 font-semibold">
                Identitas Pengguna
              </p>
              <p className="mt-1 text-slate-300">
                {user.nama}{" "}
                <span className="text-slate-500">({user.email})</span>
              </p>
              <p className="mt-1 text-slate-400">
                Role:{" "}
                <span className="font-semibold capitalize">
                  {user.role}
                </span>
              </p>
            </div>

            <div>
              <p className="text-slate-200 font-semibold">
                Cara kerja tombol presensi
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-slate-400">
                <li>
                  Frontend mengirim request{" "}
                  <code className="bg-slate-800 px-1 rounded">
                    POST /api/presensi/check-in
                  </code>{" "}
                  atau{" "}
                  <code className="bg-slate-800 px-1 rounded">
                    /check-out
                  </code>
                  .
                </li>
                <li>
                  Header{" "}
                  <code className="bg-slate-800 px-1 rounded">
                    Authorization: Bearer &lt;token&gt;
                  </code>{" "}
                  dikirim otomatis dari browser.
                </li>
                <li>
                  Backend membaca <code>req.user.id</code> dari token JWT
                  dan menyimpan presensi ke database.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default PresensiPage;
