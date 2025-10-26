import express from "express";
import { getMovies, createMovie, getMovieById, updateMovie, deleteMovie } from "../controllers/MovieController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==== RUTE PUBLIK ====
router.get("/", getMovies);
router.get("/:id", getMovieById)

//==== RUTE ADMIN ====
router.post("/", protect, adminOnly, createMovie);
router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
