import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import axios from 'axios';
import styles from './Signin.module.css';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage('');
      setError('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', formData);
      setMessage('Signin successful!');
      setError('');
      const role = response.data.role;
      dispatch(userActions.userLogin({ role }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
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
          <label htmlFor="password" className={styles.label}>Password</label>
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
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
      <Link to="/" className={styles.link}>Don't have an account? Sign Up</Link>
    </div>
  );
};

export default Signin;
