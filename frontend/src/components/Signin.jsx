import React, { useState } from 'react';
import styles from './Signin.module.css';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation for demo purposes
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields!');
      return;
    }

    setMessage('Signin successful!');
    console.log('Form Data:', formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Sign In</button>
        <Link to={"/"}>Signup</Link>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default Signin;
