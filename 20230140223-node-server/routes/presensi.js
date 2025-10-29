const express = require('express'); // Import express
const router = express.Router(); // Buat router baru
const presensiController = require('../controllers/presensiController'); // Import presensiController
const { addUserData } = require('../middleware/permisionMiddleware'); // Import middleware untuk menambahkan data user dummy
router.use(addUserData); // Gunakan middleware untuk menambahkan data user dummy
router.post('/check-in', presensiController.CheckIn); // Route untuk check-in
router.post('/check-out', presensiController.CheckOut); // Route untuk check-out
router.delete('/:id', presensiController.deletePresensi); // Route untuk menghapus data presensi berdasarkan ID
router.put('/:id', presensiController.updatePresensi); // Route untuk memperbarui data presensi berdasarkan ID
module.exports = router; // Ekspor router untuk digunakan di file lain