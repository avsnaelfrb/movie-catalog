// src/components/AddMovieForm.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";

const AddMovieForm = () => {
  // State untuk menampung data dari form
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    thumbnail: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addMovie = await axiosInstance.post("/movies", {
        title,
        description,
        genre,
        thumbnail
      });

      console.log("Data yang akan dikirim:", addMovie.data);

    } catch (error) {
      setError(error.addMovie?.data?.message || "Gagal menambahkan movie");
    }

    // Opsional: Reset form setelah submit
    setFormData({
      title: "",
      description: "",
      genre: "",
      thumbnail: "",
    });
  };

  // Helper untuk styling input yang konsisten
  const inputStyle =
    "w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="bg-gray-900 p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white">Add New Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Title --- */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Movie Title
          </label>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        {/* --- Genre --- */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        {/* --- Thumbnail URL --- */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Thumbnail URL
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className={inputStyle}
            placeholder="https://example.com/image.png"
            required
          />
        </div>

        {/* --- Description --- */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className={inputStyle}
            placeholder="A brief synopsis of the movie..."
          />
        </div>

        {/* --- Submit Button --- */}
        <div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md
                       transition-transform duration-150 ease-in-out 
                       hover:bg-opacity-90 active:scale-95"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
