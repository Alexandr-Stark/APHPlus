import React, { useState } from 'react';
import s from './Registration.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const FormSignUp = () => {
  const [visible, setvisible] = useState(false);
  const toggleBtn = () => {
    setvisible((prevState) => !prevState);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.flexTitle}>
        <h1>Sign Up</h1>
        <HomeIcon
          className={s.homeIcon}
          style={{ fill: '#fefefe' }}
          sx={{ fontSize: 32 }}
        />
      </div>
      <form className={s.form}>
        <div className={s.inputs}>
          <label htmlFor="username" className={s.label}>
            Username*
          </label>
          <div className={s.flex}>
            <input
              type="text"
              name="username"
              className={s.input}
              placeholder="Enter your Username"
            />
          </div>
        </div>
        <div className={s.inputs}>
          <label htmlFor="username" className={s.label}>
            First name
          </label>
          <div className={s.flex}>
            <input
              type="text"
              name="username"
              className={s.input}
              placeholder="Enter your First name"
            />
          </div>
        </div>
        <div className={s.inputs}>
          <label htmlFor="username" className={s.label}>
            Last name
          </label>
          <div className={s.flex}>
            <input
              type="text"
              name="username"
              className={s.input}
              placeholder="Enter your Last name"
            />
          </div>
        </div>
        <div className={s.inputs}>
          <label htmlFor="username" className={s.label}>
            Password*
          </label>
          <div className={s.flex}>
            <input
              id="password"
              type={visible ? 'text' : 'password'}
              name="password"
              className={s.input}
              placeholder="Enter your password"
            />
            <button className={s.password} onClick={toggleBtn}>
              {visible ? (
                <VisibilityOutlinedIcon
                  style={{ fill: '#fefefe' }}
                  sx={{ fontSize: 15 }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  style={{ fill: '#fefefe' }}
                  sx={{ fontSize: 15 }}
                />
              )}
            </button>
          </div>
        </div>
        <div className={s.inputs}>
          <label htmlFor="username" className={s.label}>
            Config <br /> Password*
          </label>
          <div className={s.flex}>
            <input
              id="password"
              type={visible ? 'text' : 'password'}
              name="password"
              className={s.input}
              placeholder="Enter your password"
            />
            <button className={s.password} onClick={toggleBtn}>
              {visible ? (
                <VisibilityOutlinedIcon
                  style={{ fill: '#fefefe' }}
                  sx={{ fontSize: 15 }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  style={{ fill: '#fefefe' }}
                  sx={{ fontSize: 15 }}
                />
              )}
            </button>
          </div>
        </div>
        <div className={s.inputs}>
          <label htmlFor="username" className={s.label}>
            Email*
          </label>
          <div className={s.flex}>
            <input
              id="email"
              type="email"
              name="email"
              className={s.input}
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className={s.flexBtn}>
          <button className={s.btn} type="submit">
            Sign Up
          </button>
          <span className={s.login}>
            Already have an accaunt? Login <a href={'#'}> here</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
