import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; 
      next(); 
    } catch (error) {
      res.status(401).json({ message: "Token tidak valid, otorisasi gagal" });
    }
  } else { // <-- 4. Gunakan 'else' untuk menangani jika tidak ada token
    // Ini menggantikan 'if (!token)' Anda di akhir
    return res.status(401).json({ message: "Tidak ada token, otorisasi gagal" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next(); 
  } else {
    res.status(403).json({ message: "Akses ditolak. Hanya untuk Admin." });
  }
};
