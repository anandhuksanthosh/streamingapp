import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WatchHistory.module.css";

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get("/api/user/history");
        setWatchHistory(response.data.watchHistory);
      } catch (error) {
        console.error("Error fetching watch history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading watch history...</p>
      </div>
    );
  }

  if (!watchHistory.length) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>Your watch history is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Watch History</h1>
      <div className={styles.list}>
        {watchHistory.map((movie,index) => (
          <div key={index} className={styles.movieCard}>
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className={styles.thumbnail}
            />
            <div className={styles.movieDetails}>
              <h2 className={styles.title}>{movie.title}</h2>
              <p className={styles.description}>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchHistory;
