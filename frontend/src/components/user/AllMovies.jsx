import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiPlusCircle, FiCheckCircle } from "react-icons/fi";
import styles from "./AllMovies.module.css";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/user/movies");
        setMovies(response.data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const response = await axios.get("/api/user/watchlists");
        setWatchlist(response.data.watchlists);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchMovies();
    fetchWatchlist();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/dashboard/watch-movie/${id}`);
  };

  const handleToggleWatchlist = async (id) => {
    try {
      if (watchlist.includes(id)) {
        await axios.delete(`/api/user/movies/${id}/watchlist`);
        setWatchlist((prev) => prev.filter((movieId) => movieId !== id));
      } else {
        await axios.post(`/api/user/movies/${id}/watchlist`);
        setWatchlist((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Movies</h1>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie._id}
            className={styles.card}
            onClick={() => handleCardClick(movie._id)}
          >
            <div className={styles.thumbnailWrapper}>
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className={styles.thumbnail}
              />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.description}>
                {movie.description.length > 100
                  ? `${movie.description.substring(0, 100)}...`
                  : movie.description}
              </p>
              <button
                className={styles.watchlistButton}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleToggleWatchlist(movie._id);
                }}
              >
                {watchlist.includes(movie._id) ? (
                  <>
                    <FiCheckCircle className={styles.icon} />
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <FiPlusCircle className={styles.icon} />
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
