import express from "express";
import { getMovies, createMovie, getMovieById, updateMovie, deleteMovie } from "../controllers/MovieController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

import upload from "../config/multerConfig.js"; 

const router = express.Router();

// ==== RUTE PUBLIK ====
router.get("/", getMovies);
router.get("/:id", getMovieById)

//==== RUTE ADMIN ====
router.post("/", protect, adminOnly, upload.single('thumbnail'), createMovie);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("thumbnail"),
  updateMovie
);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
