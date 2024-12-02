import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListUsers.module.css";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Search users
  const searchUsers = async (query) => {
    try {
      const response = await axios.get(`/api/admin/users/search?query=${query}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  // Block or unblock a user
  const toggleBlockUser = async (userId, isBlocked) => {
    try {
      if (isBlocked) {
        await axios.put(`/api/admin/users/${userId}/unblock`);
      } else {
        await axios.put(`/api/admin/users/${userId}/block`);
      }
      fetchUsers(); // Refresh the list after block/unblock
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      searchUsers(event.target.value);
    } else {
      fetchUsers();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Management</h2>

      {/* Search input */}
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by email"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {users.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Block Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  <button
                    className={styles.toggleButton}
                    onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <Link to={`/dashboard/watchhistory/${user._id}`}>
                    <button className={styles.historyButton}>View History</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default ListUsers;
