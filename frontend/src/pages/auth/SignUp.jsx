import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { styles } from '../../styles/SignUp';


export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        const data = await response.json();

        const token = await data.token;
        const id = await data.user.id;

        localStorage.setItem('token', token);

        navigate(`/users/${id}`);
      } else {
        console.error('login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.signIn}>
          Sign Up
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="name"
              name="name"
              id="name"
              className={styles.input}
              placeholder="Joe Dawson"
              value={name}
              onChange={handleName}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder="example@email.com"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={styles.input}
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <button type="submit" className={styles.submit}>
            Sign up
          </button>
          <p className={styles.footer}>
            Go back to
            {" "}
            <Link to="/signin" className={styles.signUp}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
