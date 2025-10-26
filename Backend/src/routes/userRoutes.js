import express from "express";
import { createUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/UserController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js"

const router = express.Router();

// ==== RUTE PUBLIK ====
router.post("/", createUser);
router.post("/login", loginUser);

// ==== RUTE ADMIN ====
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
