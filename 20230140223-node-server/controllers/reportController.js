const presensiRecords = request("../data/presensiData"); // Import data presensi dari data/presensiData.js
exports.getDailyReport = (req, res) => { // Fungsi untuk mendapatkan laporan harian
    console.log("Controller: Mengambil data laporan harian dari array..") // Log untuk debugging
    res.json({ // Kirim respons sukses
        reportDate: new Date().toLocaleDateString(), // Tanggal laporan
        data: presensiRecords, // Kirim data presensi
    });
};