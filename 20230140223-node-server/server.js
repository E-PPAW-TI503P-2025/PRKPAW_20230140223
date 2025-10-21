const express = require('express'); // Import express
const cors = require('cors'); // Import cors untuk mengizinkan request dari browser
const app = express(); // Buat aplikasi express
const port = 3001; // Tentukan port server
const morgan = require('morgan'); // Import morgan untuk logging request

const presensiRoutes = require('./routes/presensi'); // Import routes presensi
const reportRoutes = require('./routes/reports'); // Import routes laporan

app.use(cors()); // izinkan request dari browser (menghindari CORS)
app.use(express.json()); // untuk parsing application/json
app.use(morgan('dev')); // logging request ke console

app.use((req, res, next) => { // Middleware logging sederhana
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`); // Log waktu, metode, dan URL request
  next(); // Lanjut ke middleware atau route handler berikutnya
});

app.get('/', (req, res) => { // Route dasar
  res.send('Selamat datang di API Presensi Karyawan!'); // Kirim pesan sambutan
});

app.use('/api/presensi', presensiRoutes); // Gunakan routes presensi
app.use('/api/reports', reportRoutes); // Gunakan routes laporan

app.listen(port, () => { // Jalankan server
  console.log(`Express server running on http://localhost:${port}`); // Log URL server
});
