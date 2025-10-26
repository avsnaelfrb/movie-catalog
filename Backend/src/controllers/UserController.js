import prisma from "../config/prismaClient.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user){
      return res.status(404).json({ message: "User tidak ditemukan" })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch){
      return res.status(401).json({ message: "Password salah" })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message : "Login berhasil",
      token
    });
  } catch (err){
    res.status(500).json({ 
      message: "server error",
      error: err.message
     })
  }
}

/**
 * @desc    Registrasi user baru 
 * @route   GET /api/user
 * @access  Publik
 */
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, email, password : hashedPassword }
    });
    res.status(201).json({
      data: { id: newUser.id, name: newUser.name, email: newUser.email },
      message: "User Was Succesfully Created",
      status: "success",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      status: "error",
    });
  }
  return;
};


/**
 * @desc    Mengambil semua user (Hanya Admin)
 * @route   GET /api/users
 * @access  Private (Admin)
 */
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      // Pilih field yang ingin ditampilkan, JANGAN kirim password
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc    Mengambil satu user by ID (Hanya Admin)
 * @route   GET /api/users/:id
 * @access  Private (Admin)
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc    Update data user (Hanya Admin)
 * @route   PUT /api/users/:id
 * @access  Private (Admin)
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;

  try {
    let dataToUpdate = { name, email, role };

    // Jika admin juga mengirim password baru, hash password itu
    if (password) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
      select: { // Kirim balik data yang sudah diupdate (tanpa password)
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    res.status(200).json({ message: "User berhasil diupdate", data: updatedUser });

  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc    Menghapus user (Hanya Admin)
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};