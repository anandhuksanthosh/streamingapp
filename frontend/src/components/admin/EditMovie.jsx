import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditMovie.module.css";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    thumbnail: null,
    video: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // Fetch the current movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/admin/movies/${id}`);
        const { title, description, thumbnail } = response.data.movie;
        setMovie({ title, description });
        setThumbnailPreview(thumbnail);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", movie.title);
    formData.append("description", movie.description);
    if (movie.thumbnail) formData.append("thumbnail", movie.thumbnail);
    if (movie.video) formData.append("video", movie.video);

    try {
      await axios.put(`/api/admin/movies/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Movie updated successfully");
      navigate("/dashboard/listmovies");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail" && files.length) {
      setThumbnailPreview(URL.createObjectURL(files[0]));
    }
    setMovie((prev) => ({ ...prev, [name]: files[0] }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Movie</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={movie.description}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="thumbnail">
            Thumbnail:
          </label>
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className={styles.thumbnailPreview}
            />
          )}
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="video">
            Video:
          </label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Update Movie
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate("/dashboard/listmovies")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
