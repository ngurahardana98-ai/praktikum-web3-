const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produk.controller");
const ProdukModel = require('../models/produk.model')
router.get("/", produkController.getDaftarProduk);
router.get("/tambah", produkController.getFormTambah);
router.post("/tambah", produkController.postTambahProduk);
router.get("/edit/:id", produkController.getFormEdit);
router.post("/edit/:id", produkController.postUpdateProduk);
router.post("/hapus/:id", produkController.postHapusProduk);
router.get("/uji-keamanan", async (req, res) => {
  const inputPayload = req.query.kategori; // Menangkap query string URL (?kategori=...)
  // Skenario A: Kueri Rentan Injeksi
  // const hasil = await ProdukModel.getByKategoriInsecure(inputPayload);
  // Skenario B: Kueri Aman Prepared Statement
  const hasil = await ProdukModel.getByKategoriSecure(inputPayload);
  res.json({
    input: inputPayload,
    totalDataDitemukan: hasil.length,
    data: hasil,
  });
});
module.exports = router;
