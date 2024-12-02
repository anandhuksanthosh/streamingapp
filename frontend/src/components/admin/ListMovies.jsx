import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ListMovies.module.css";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get("/api/admin/movies");
      setMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`/api/admin/movies/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id)); // Update the state after deletion
      alert("Movie deleted successfully");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-movie/${id}`);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Movies List</h2>
      {movies.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Thumbnail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className={styles.thumbnail}
                  />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.button} ${styles.editButton}`}
                      onClick={() => handleEdit(movie._id)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.button} ${styles.deleteButton}`}
                      onClick={() => deleteMovie(movie._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noMovies}>No movies found.</p>
      )}
    </div>
  );
};

export default ListMovies;
