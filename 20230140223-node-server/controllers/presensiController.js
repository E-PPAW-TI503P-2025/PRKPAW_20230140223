const presensiRecords = require("../data/presensiData"); // Import data presensi dari data/presensiData.js
const{ format } = require("date-fns-tz"); // Import format dari date-fns-tz untuk format tanggal dengan zona waktu
const { checkout } = require("../routes/books");
const timeZone = 'Asia/Jakarta'; // Zona waktu yang diinginkan

exports.CheckIn = (req, res) => { // Fungsi untuk handle check-in
    const{id: userId, nama: userName} = req.user; // Ambil data user dari req.user (dari middleware)
    const waktuSekarang = new Date(); // Waktu saat ini
    const existingRecord = presensiRecords.find( // Cek apakah user sudah check-in tapi belum check-out
        (record) => record.userId === userId && record.checkOut === null // Belum check-out
    );
    if (existingRecord) { // Jika sudah ada record check-in tanpa check-out
        return res
        .status(400) // Kirim status 400
        .json ({ message: "Anda sudah melakukan check-in hari ini." }); // Kirim respons error
    }
    const newRecord = { // Buat record presensi baru
        userId, // Gunakan ID dari data user
        nama: userName, // Gunakan nama dari data user
        checkIn: waktuSekarang, // Set waktu check-in
        checkOut: null // Belum check-out
    };
    presensiRecords.push(newRecord); // Tambahkan record baru ke data presensi

    const formattedData = { // Format data untuk respons
        ...newRecord, // Salin semua properti dari newRecord
        checkIn: format(newRecord.checkIn, 'yyyy-MM-dd HH:mm:ss', { timeZone }), // Format waktu check-in
    };
    console.log(
        `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan CHECK-IN pada ${formattedData.checkIn}`
    );

    res.status(201).json({ // Kirim respons sukses
        message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
    )} WIB`,
        data: formattedData // Sertakan data presensi yang sudah diformat
    });
};

exports.CheckOut = (req, res) => { // Fungsi untuk handle check-out
    const{ id: userId, nama: userName} = req.user; // Ambil data user dari req.user (dari middleware)
    const waktuSekarang = new Date(); // Waktu saat ini
    const recordToUpdate = presensiRecords.find( // Cari record presensi yang belum check-out
        (record) => record.userId === userId && record.checkOut === null // Belum check-out
    );

    if (!recordToUpdate) { // Jika tidak ada record yang ditemukan
        return res
        .status(400) // Kirim status 400
        .json({ 
            message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.", // Pesan error
         }); // Kirim respons error
    }
    recordToUpdate.checkOut = waktuSekarang; // Set waktu check-out
    const formattedData = { // Format data untuk respons
        ...recordToUpdate, // Salin semua properti dari recordToUpdate
        checkIn: format(recordToUpdate.checkIn, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone }), // Format waktu check-in
        checkout: format(recordToUpdate.checkOut, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone }), // Format waktu check-out
    };

    console.log( // Log data terupdate
        `DATA TERUPDATE: Karyawan ${userName} (ID: ${userId}) melakukan check-out pada ${formattedData.checkout}` // Log data terupdate
    );

    res.json({ // Kirim respons sukses
        message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format( // Kirim respons sukses
            waktuSekarang, // Waktu saat ini
            "HH:mm:ss", // Format jam:menit:detik
            { timeZone } // Zona waktu
        )} WIB`, // Pesan sukses
        data: formattedData, // Sertakan data presensi yang sudah diformat
    });
};