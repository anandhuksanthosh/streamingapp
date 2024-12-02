import React, { useState } from "react";
import axios from "axios";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/reset-password", {
        email,
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reset Password</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Reset Password
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
