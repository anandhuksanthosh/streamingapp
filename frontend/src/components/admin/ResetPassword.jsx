import React, { useState } from "react";
import axios from "axios";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/reset-password", {
        newPassword,
      });

      setMessage(response.data.message);
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error resetting password. Please try again.");
      setMessage(""); // Clear any previous success messages
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reset Password</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
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
            placeholder="Enter new password"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Reset Password
        </button>
      </form>

      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
