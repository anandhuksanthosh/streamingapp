import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios"; // To send the logout request
import styles from "./UserLandingPage.module.css";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const UserLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await axios.post("/api/auth/logout");
      console.log(response.data.message); // You can log the success message

      // Redirect to login page or perform other actions after logout
      navigate("/") // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Dashboard</h1>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <IoMdClose size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li>
              <Link to="/dashboard/allmovies" className={styles.menuItem}>
                All Movies
              </Link>
            </li>
            <li>
              <Link to="/dashboard/reset-password" className={styles.menuItem}>
                Change Password
              </Link>
            </li>
            <li>
              <Link to="/dashboard/watch-history" className={styles.menuItem}>
                Watch History
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className={styles.logoutButton} // You can style the logout button
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.scrollableBlock}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
