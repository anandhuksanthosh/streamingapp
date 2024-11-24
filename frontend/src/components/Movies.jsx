import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use React Router for navigation
import styles from './Movies.module.css';

const Movies = () => {
  // Example movies data
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'A mind-bending thriller by Christopher Nolan.',
    },
    {
      id: 2,
      title: 'Interstellar',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'A journey through space and time.',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      thumbnail: 'https://via.placeholder.com/150',
      description: 'The legendary DC superhero Batman fights crime.',
    },
  ]);

  const handleSave = (id) => {
    alert(`Movie with ID ${id} saved!`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Movies</h1>
      <div className={styles.cardContainer}>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.card}>
            <img
              src={movie.thumbnail}
              alt={`${movie.title} Thumbnail`}
              className={styles.thumbnail}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{movie.title}</h3>
              <p className={styles.description}>{movie.description}</p>
              <button
                className={styles.saveButton}
                onClick={(e) => {
                  e.preventDefault(); // Prevent link navigation on button click
                  handleSave(movie.id);
                }}
              >
                Save
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
