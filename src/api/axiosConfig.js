// src/api/axiosConfig.js
import axios from "axios";

// 1. Buat kurir dengan alamat default
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 2. Ini bagian "ajaib"-nya: INTERCEPTOR
// Fungsi ini akan berjalan SEBELUM setiap request dikirim
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari Local Storage (yang akan kita simpan saat login)
    const token = localStorage.getItem("authToken");

    if (token) {
      // Jika token ada, tambahkan ke header Authorization
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
