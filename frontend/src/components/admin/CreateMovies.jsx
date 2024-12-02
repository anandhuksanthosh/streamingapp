import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateMovies.module.css";

const CreateMovies = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (video) formData.append("video", video);

    try {
      const response = await axios.post("/api/admin/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Movie created successfully!");
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setVideo(null);
    } catch (error) {
      setMessage("Failed to create movie. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create a New Movie</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter movie description"
            rows="4"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="thumbnail">Thumbnail (Image)</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="video">Movie File (Video)</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovies;
