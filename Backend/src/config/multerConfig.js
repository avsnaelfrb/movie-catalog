// Backend/src/config/multerConfig.js
import multer from "multer";
import path from "path";

// 1. Tentukan lokasi penyimpanan
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Simpan file ke folder yang kita buat tadi
    cb(null, "public/uploads/thumbnails");
  },
  filename: function (req, file, cb) {
    // 2. Buat nama file unik (agar tidak ada nama yg sama)
    // Misal: thumbnail-172999999-avatar.jpg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "thumbnail-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// 3. Filter file (opsional, tapi bagus untuk keamanan)
// Pastikan hanya file gambar yang diupload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true); // Terima file
  } else {
    cb(new Error("Hanya file .jpeg, .png, atau .gif yang diizinkan!"), false); // Tolak file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Batas ukuran file 5MB
  },
});

export default upload;
