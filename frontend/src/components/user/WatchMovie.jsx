import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./WatchMovie.module.css";

const WatchMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/user/movies/${id}/watch`);
        setMovie(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading movie...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Movie not found. Please try again.</p>
        <button className={styles.goBackButton} onClick={() => navigate(-1)}>
          <FiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1 className={styles.pageTitle}>{movie.title}</h1>
      </header>
      <div className={styles.videoWrapper}>
        <video
          src={movie.videoUrl}
          controls
          autoPlay
          className={styles.video}
        ></video>
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.description}>{movie.description}</p>
      </div>
    </div>
  );
};

export default WatchMovie;
