import { React, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

import styles from './styles.module.scss';

function Loginpage() {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, request } = useHttp();
  const navigate = useNavigate();

  const [visiblePass, setVisiblePass] = useState(false);

  function tooglePasswordVisible() {
    setVisiblePass(!visiblePass);
  }

  function changeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function serverAction() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await request('api/auth/sign-in', 'POST', { ...form });
      auth.login(response.token, response.userId);
      if(auth.ready) navigate('/browse');
    } catch (e) {
      // throw e
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <Link to={"/"}>
          <img
            className={styles.logo}
            src="https://asd-internship.fra1.digitaloceanspaces.com/aphpluslogo.png"
            alt="Something went wrong..."
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
            value={form.email}
            placeholder="Email"
            onChange={changeHandler}
          />
          <div className={styles.sectionFieldPass}>
            <input
              type={visiblePass ? 'text' : 'password'}
              name="password"
              value={form.password}
              placeholder="Password"
              autoComplete="off"
              onChange={changeHandler}
            />
            <p id="password" onClick={tooglePasswordVisible}>
              {visiblePass ? 'Hide' : 'Show'}
            </p>
          </div>
          <button disabled={loading} className={styles.loginButton} onClick={serverAction}>
            Sign In
          </button>
          <span>
            New to APH+? <Link to="/sign-up">Sign up now.</Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you`re not a
            bot. <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Learn more</a>.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
