import React, { useState } from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [watchedMovies, setWatchedMovies] = useState([
    { id: 1, title: "Inception" },
    { id: 2, title: "Interstellar" },
  ]);
  const [savedMovies, setSavedMovies] = useState([
    { id: 3, title: "The Dark Knight" },
    { id: 4, title: "Dunkirk" },
  ]);

  const handleChangePassword = () => {
    alert(`Password changed to: ${password}`);
    setPassword("");
  };

  const handleDeleteMovie = (id) => {
    setSavedMovies(savedMovies.filter((movie) => movie.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Settings</h1>

      {/* Change Password Section */}
      <div className={styles.section}>
        <h2 className={styles.subheading}>Change Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className={styles.input}
        />
        <button className={styles.button} onClick={handleChangePassword}>
          Change Password
        </button>
      </div>

      {/* Watched Movies Section */}
      <div className={styles.section}>
        <h2 className={styles.subheading}>Watched Movies</h2>
        <ul className={styles.movieList}>
          {watchedMovies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              {movie.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Saved Movies Section */}
      <div className={styles.section}>
        <h2 className={styles.subheading}>Saved Movies</h2>
        <ul className={styles.movieList}>
          {savedMovies.map((movie) => (
            <li key={movie.id} className={styles.movieItem}>
              <span>{movie.title}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
