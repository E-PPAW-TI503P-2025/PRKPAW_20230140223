const express = require('express'); // Import express
const router = express.Router(); // Buat router baru
const presensiController = require('../controllers/presensiController'); // Import presensiController
const { addUserData } = require('../middleware/permisionMiddleware'); // Import middleware untuk menambahkan data user dummy
router.use(addUserData); // Gunakan middleware untuk menambahkan data user dummy
router.post('/check-in', presensiController.CheckIn); // Route untuk check-in
router.post('/check-out', presensiController.CheckOut); // Route untuk check-out
module.exports = router; // Ekspor router untuk digunakan di file lain