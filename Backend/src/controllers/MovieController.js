// Backend/src/controllers/MovieController.js
import prisma from "../config/prismaClient.js";

/**
 * @desc    Mengambil semua film (Publik)
 * @route   GET /api/movies
 * @access  Publik
 */
export const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil film", error: error.message });
  }
};

/**
 * @desc    Membuat film baru (Hanya Admin)
 * @route   POST /api/movies
 * @access  Private (Admin)
 */
export const createMovie = async (req, res) => {
  const { title, description, genre } = req.body;

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "File cover (thumbnail) tidak boleh kosong" });
  }

  const thumbnailUrl = `${req.protocol}://${req.get(
    "host"
  )}/uploads/thumbnails/${req.file.filename}`;

  if (!title) {
    return res.status(400).json({ message: "Title tidak boleh kosong" });
  }

  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        genre,
        thumbnail: thumbnailUrl
      },
    });
    res
      .status(201)
      .json({ message: "Film berhasil ditambahkan", data: newMovie });
  } catch (error) {
    console.error("Error creating movie:", error);
    res
      .status(500)
      .json({ message: "Gagal membuat film", error: error.message });
  }
};

/**
* @desc Mengambil satu film berdasarkan ID (publik)
* @route GET /api/movies/:id
* @access Publik
 */

export const getMovieById = async (req, res) => {
   try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(id) }
    });

    if(!movie){
      return res.status(404).json({
        message: "film tidak ditemukan"
      });
    }

    res.status(200).json(movie);
   } catch(error) {
    res.status(500).json(({
      message : "Gagal mengambil film", 
      error : error.message
    }))
   }
}

/**
 * @desc    Mengupdate film (Hanya Admin)
 * @route   PUT /api/movies/:id
 * @access  Private (Admin)
 */
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, genre, thumbnail } = req.body;
  try {
    const dataToUpdate = {};

    if (title){
      dataToUpdate.title = title;
    }

    if (description){
      dataToUpdate.description = description;
    }

    if (genre){
      dataToUpdate.genre = genre;
    }

    if(req.file){
      const thumbnailUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/thumbnails/${req.file.filename}`;
      dataToUpdate.thumbnail = thumbnailUrl;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ message: "Tidak ada data untuk diupdate" });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: dataToUpdate
    });

    res
      .status(200)
      .json({ message: "Film berhasil diupdate", data: updatedMovie });
  } catch (error) {

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }
    res
      .status(500)
      .json({ message: "Gagal mengupdate film", error: error.message });
  }
};

/**
 * @desc    Menghapus film (Hanya Admin)
 * @route   DELETE /api/movies/:id
 * @access  Private (Admin)
 */
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Film berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }
    res
      .status(500)
      .json({ message: "Gagal menghapus film", error: error.message });
  }
};