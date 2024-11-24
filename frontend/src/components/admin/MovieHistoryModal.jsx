import React from "react";
import styles from "./MovieHistoryModal.module.css";

const MovieHistoryModal = ({ isOpen, onClose, userId, movieHistory }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Movie History for User ID: {userId}</h2>
        {movieHistory && movieHistory.length > 0 ? (
          <ul className={styles.movieList}>
            {movieHistory.map((movie, index) => (
              <li key={index} className={styles.movieItem}>
                <strong>{movie.title}</strong> - {movie.dateWatched}
              </li>
            ))}
          </ul>
        ) : (
          <p>No movie history available for this user.</p>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieHistoryModal;
