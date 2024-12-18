import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ListMoviesByViews.module.css";

const ListMoviesByViews = () => {
  const [movies, setMovies] = useState([]);

  // Fetch movies sorted by view count
  const fetchMoviesByViews = async () => {
    try {
      const response = await axios.get("/api/admin/movies/sorted");
      setMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMoviesByViews();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Movies Sorted by View Count</h2>
      {movies.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>View Count</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.viewCount}</td>
                <td>
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className={styles.thumbnail}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default ListMoviesByViews;
