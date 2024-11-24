import React, { useState } from "react";
import { useParams } from "react-router-dom"; // For extracting the movie ID from the URL
import styles from "./MoviePlayer.module.css";

const MoviePlayer = () => {
  const { id } = useParams(); // Extract movie ID from URL
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Example movie data
  const movies = [
    {
      id: 1,
      title: "Inception",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
    },
    {
      id: 2,
      title: "Interstellar",
      videoUrl: "https://www.w3schools.com/html/movie.mp4", // Example video URL
    },
    {
      id: 3,
      title: "The Dark Knight",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
    },
  ];

  // Find the movie by ID
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div className={styles.error}>Movie not found!</div>;
  }

  // Fullscreen handler
  const handleFullscreen = () => {
    const videoElement = document.getElementById("moviePlayerVideo");
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const handleSave = () => {
    alert(`Movie "${movie.title}" has been saved!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <video
          id="moviePlayerVideo"
          className={styles.video}
          controls
          src={movie.videoUrl}
        />
      </div>
      <h2 className={styles.title}>{movie.title}</h2>
      <div className={styles.buttons}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save Movie
        </button>
        <button className={styles.fullscreenButton} onClick={handleFullscreen}>
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export default MoviePlayer;
