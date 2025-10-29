const { Presensi } = require("../models");
const { format } = require("date-fns-tz");
const { matchedData } = require("express-validator");
const timeZone = "Asia/Jakarta";

exports.CheckIn = async (req, res) => {

  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const existingRecord = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Anda sudah melakukan check-in hari ini." });
    }

    const newRecord = await Presensi.create({
      userId: userId,
      nama: userName,
      checkIn: waktuSekarang,
    });
    
    const formattedData = {
        userId: newRecord.userId,
        nama: newRecord.nama,
        checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
        checkOut: null
    };

    res.status(201).json({
      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.CheckOut = async (req, res) => {

  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const recordToUpdate = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (!recordToUpdate) {
      return res.status(404).json({
        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
      });
    }

    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();

    const formattedData = {
        userId: recordToUpdate.userId,
        nama: recordToUpdate.nama,
        checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
        checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
    };

    res.json({
      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.deletePresensi = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const presensiId = req.params.id;
    const recordToDelete = await Presensi.findByPk(presensiId);

    if (!recordToDelete) {
      return res
        .status(404)
        .json({ message: "Data presensi tidak ditemukan." });
    }
    if (recordToDelete.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Anda tidak berhak menghapus data ini." });
    }
    await recordToDelete.destroy();
    res.status(200).json({ message: "Data presensi berhasil dihapus." });
  } catch (error) {
    res
    .status(500)
    .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const data = matchedData(req, { includeOptionals: true });
    const { waktuCheckIn, waktuCheckOut, nama } = data;

    if (waktuCheckIn == null && waktuCheckOut == null && nama == null) {
      return res.status(400).json({ message: "Tidak ada data yang diberikan untuk diperbarui." });
    }

    const recordToUpdate = await Presensi.findByPk(presensiId);
    if (!recordToUpdate) {
      return res.status(404).json({ message: "Catatan presensi tidak ditemukan." });
    }

    const updates = {};
    if (waktuCheckIn)  updates.checkIn  = new Date(waktuCheckIn);
    if (waktuCheckOut) updates.checkOut = new Date(waktuCheckOut);
    if (typeof nama === "string") updates.nama = nama;

    await recordToUpdate.update(updates);

const toWIB = (d) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).format(new Date(d)).replace(', ', ' ') + '+07:00';

res.json({
  message: "Data presensi berhasil diperbarui.",
  data: {
    id: recordToUpdate.id,
    userId: recordToUpdate.userId,
    nama: recordToUpdate.nama,
    checkIn:  recordToUpdate.checkIn  ? toWIB(recordToUpdate.checkIn)  : null,
    checkOut: recordToUpdate.checkOut ? toWIB(recordToUpdate.checkOut) : null,
    createdAt: toWIB(recordToUpdate.createdAt),
    updatedAt: toWIB(recordToUpdate.updatedAt),
  }
});
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};
