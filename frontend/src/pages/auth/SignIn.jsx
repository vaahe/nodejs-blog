import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styles } from '../../styles/SignIn';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../redux/features/user/userSlices';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const response = await fetch('http://localhost:8080/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });


      if (response.ok) {
        const data = await response.json();
        dispatch(loggedIn(data));
        console.log(data);
        
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

    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.signIn}>
          Sign In
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={styles.label}>Your email</label>
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
            Sign in
          </button>
          <p className={styles.footer}>
            Don’t have an account yet?
            {" "}
            <Link to="/signup" className={styles.signUp}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
