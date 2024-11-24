import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      {/* Left Navigation Bar */}
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="listmovies"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addmovie"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Add Movie
            </NavLink>
          </li>
          <li>
            <NavLink
              to="changepassword"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Change Password
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Right Side Outlet */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
