/* eslint-disable no-unused-vars */
import { React, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import styles from './styles.module.scss';
import homeImg from '../../assets/images/registration/home.png';
import { AuthContext } from '../../context/AuthContext';

function Regpage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    nickname: '',
    name: '',
    surname: '',
    birthday: '',
    phoneNumber: '',
  });
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const navigate = useNavigate();

  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);

  function tooglePasswordVisible(event) {
    if (event.target.id === 'password') {
      setVisiblePass(!visiblePass);
      return;
    }
    setVisibleConfirmPass(!visibleConfirmPass);
  }

  function changeHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function serverAction() {
    try {
      await request('api/auth/sign-up', 'POST', { ...form });
      if(auth.ready) navigate('/sign-in');
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <section className={styles.sectionRegistration}>
          <div className={styles.registrationForm}>
            <header className={styles.registrationHeader}>
              <p className={styles.registrationTitle}>Registration</p>
              <Link className={styles.registrationHomeBtn} to="/sign-in">
                <img src={homeImg} alt="Sign in" />
              </Link>
            </header>
            <main className={styles.registrationContent}>
              <section className={styles.sectionField}>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  placeholder="Email"
                  onChange={changeHandler}
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Password</label>
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
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Confirm Password</label>
                <div className={styles.sectionFieldPass}>
                  <input
                    type={visibleConfirmPass ? 'text' : 'password'}
                    name="passwordConfirmation"
                    value={form.passwordConfirmation}
                    placeholder="Password"
                    autoComplete="off"
                    onChange={changeHandler}
                  />
                  <p id="passwordConfirmation" onClick={tooglePasswordVisible}>
                    {visibleConfirmPass ? 'Hide' : 'Show'}
                  </p>
                </div>
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  placeholder="Phone Number"
                  onChange={changeHandler}
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  value={form.nickname}
                  placeholder="Nickname"
                  onChange={changeHandler}
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Name"
                  onChange={changeHandler}
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="surname"
                  value={form.surname}
                  placeholder="Surname"
                  onChange={changeHandler}
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Date of birth</label>
                <input type="date" name="birthday" value={form.birthday} onChange={changeHandler} />
              </section>
            </main>
            <footer className={styles.registrationFooter}>
              <button
                disabled={loading}
                className={styles.registrationRegBtn}
                onClick={serverAction}
              >
                Sign Up
              </button>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Regpage;
