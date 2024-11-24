import React, { useState } from "react";
import styles from "./Users.module.css";
import MovieHistoryModal from "./MovieHistoryModal";

const Users = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", isBlocked: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", isBlocked: true },
    {
      id: 3,
      name: "Alice Brown",
      email: "alice@example.com",
      isBlocked: false,
    },
  ]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleBlockStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users by name or email..."
        className={styles.searchInput}
        value={search}
        onChange={handleSearchChange}
      />

      {/* Users Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className={
                    user.isBlocked ? styles.unblockButton : styles.blockButton
                  }
                  onClick={() => toggleBlockStatus(user.id)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                {/* <a href={`/users/${user.id}/movies`} className={styles.link}>
                  View Movie History
                </a> */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setIsModalOpen(true);
                  }}
                >
                  View Movie History
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MovieHistoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userId={selectedUserId}
        movieHistory={movieHistory}
      />
    </div>
  );
};

export default Users;
