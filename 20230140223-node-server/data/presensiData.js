const { checkout } = require("../routes/books"); // Import checkout dari routes/books.js (jika diperlukan)

const presensiRecords = [ // Data dummy presensi
    {
        userId: 456, // ID unik untuk user karyawan
        nama: 'User Karyawan', // Nama karyawan
        chekin: new Date('2025-10-14T08:05:00'), // Waktu check-in
        checkout: new Date('2025-10-14T17:00:00'), // Waktu check-out
    }
];

module.exports = presensiRecords; // Ekspor data presensi untuk digunakan di file lain