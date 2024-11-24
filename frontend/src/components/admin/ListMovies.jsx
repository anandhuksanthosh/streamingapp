import React, { useState } from "react";
import styles from "./ListMovies.module.css";

const ListMovies = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller",
      link: "https://example.com/inception",
    },
    {
      id: 2,
      title: "Titanic",
      description: "A tragic love story",
      link: "https://example.com/titanic",
    },
    {
      id: 3,
      title: "Avatar",
      description: "An epic science fiction film",
      link: "https://example.com/avatar",
    },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleEditClick = (movie) => {
    setEditingId(movie.id);
    setEditData({
      title: movie.title,
      description: movie.description,
      link: movie.link,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (id) => {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, ...editData } : movie))
    );
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Movie List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              {editingId === movie.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="link"
                      value={editData.link}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <button
                      className={styles.saveButton}
                      onClick={() => handleSaveClick(movie.id)}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{movie.title}</td>
                  <td>{movie.description}</td>
                  <td>
                    <a
                      href={movie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View Movie
                    </a>
                  </td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditClick(movie)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteClick(movie.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMovies;
