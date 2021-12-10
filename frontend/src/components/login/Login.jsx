import React from 'react';
import login from './login.module.scss';

const Login = () => {
  return (
    <div className={login.login}>
      <div className={login.top}>
        <div className={login.wrapper}>
          <img
            className={login.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className={login.container}>
        <div>
          <form>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email or phone number" />
            <input type="password" placeholder="Password" />
            <button className={login.loginButton}>Sign In</button>
            <span>
              New to APH+? <a>Sign up now.</a>
            </span>
            <small>
              This page is protected by Google reCAPTCHA to ensure you`re not a
              bot. <a>Learn more</a>.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
