const express = require('express'); // Import express
const router = express.Router(); // Buat router baru
const reportController = require('../controllers/reportController'); // Import reportController
const { addUserData, isAdmin } = require('../middleware/permisionMiddleware'); // Import middleware untuk menambahkan data user dummy dan memeriksa admin
report.get('/daily', [addUserData, isAdmin], reportController.getDailyReport); // Route untuk mendapatkan laporan harian, hanya untuk admin
module.exports = router; // Ekspor router untuk digunakan di file lain