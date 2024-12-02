import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios"; // To send the logout request
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await axios.post("/api/auth/logout");
      console.log(response.data.message); // Log the success message

      // Redirect to login page after logout
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.menu}>
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="listmovies">List Movies</Link>
            </li>
            <li>
              <Link to="by-view-count">Reports (View Count)</Link>
            </li>
            <li>
              <Link to="reset-password">Change Password</Link>
            </li>
            <li>
              <Link to="users">List All Users</Link>
            </li>
            <li>
              <Link to="create-movies">Create Movies</Link>
            </li>
            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className={styles.logoutButton} // You can style this button
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
