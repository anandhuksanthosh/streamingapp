import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
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
              <Link to="create-movies">Create movies</Link>
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
