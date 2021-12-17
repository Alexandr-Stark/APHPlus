/* eslint-disable no-unused-vars */
import { React, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

function Loginpage() {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, request } = useHttp();

  const [visiblePass, setVisiblePass] = useState(false);

  function tooglePasswordVisible() {
    setVisiblePass(!visiblePass);
  }

  function changeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function serverAction() {
    try {
      const response = await request('api/auth/sign-in', 'POST', { ...form });
      auth.login(response.token, response.userId);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <Link to="/">
          <img
            className={styles.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Sign In</h1>
          <input
            type="text"
            name="email"
            onChange={changeHandler}
            placeholder="Email"
          />
          <div className={styles.sectionFieldPass}>
            <input
              name="password"
              onChange={changeHandler}
              type={visiblePass ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="off"
            />
            <p id="password" onClick={tooglePasswordVisible}>
              {visiblePass ? 'Hide' : 'Show'}
            </p>
          </div>
          <button onClick={serverAction} className={styles.loginButton}>
            Sign In
          </button>
          <span>
            New to APH+? <Link to="/sign-up">Sign up now.</Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you`re not a
            bot. <a>Learn more</a>.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
