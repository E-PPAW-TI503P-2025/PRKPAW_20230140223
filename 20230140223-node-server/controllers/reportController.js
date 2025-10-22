const presensiRecords = require("../data/presensiData"); // Import data presensi dari data/presensiData.js

exports.getDailyReport = (req, res) => { // Fungsi untuk mendapatkan laporan harian
    console.log("Controller: Mengambil data laporan harian dari array..") // Log untuk debugging

    const tanggalLaporan = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "short",
    });

    res.json({ // Kirim respons sukses
        status: "success", // Status sukses
        message: "Laporan harian berhasil diambil.", // Pesan sukses
        reportDate: tanggalLaporan, // Sertakan tanggal laporan
        data: presensiRecords, // Kirim data presensi
    });
};