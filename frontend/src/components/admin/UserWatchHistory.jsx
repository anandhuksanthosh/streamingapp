import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./UserWatchHistory.module.css";

const UserWatchHistory = () => {
  const { id } = useParams();
  const [watchHistory, setWatchHistory] = useState([]);

  // Fetch the user's watch history
  const fetchWatchHistory = async () => {
    try {
      const response = await axios.get(`/api/admin/users/${id}/history`);
      setWatchHistory(response.data.watchHistory);
    } catch (error) {
      console.error("Error fetching watch history:", error);
    }
  };

  useEffect(() => {
    fetchWatchHistory();
  }, [id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Watch History</h2>

      {watchHistory.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Watch Date</th>
            </tr>
          </thead>
          <tbody>
            {watchHistory.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{new Date(movie.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No watch history available.</p>
      )}
    </div>
  );
};

export default UserWatchHistory;
