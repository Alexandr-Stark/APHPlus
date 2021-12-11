/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import styles from './styles.module.scss';
import homeImg from '../../assets/images/registration/home.png';
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
  const { loading, request } = useHttp();

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
              <a className={styles.registrationHomeBtn} href="#">
                <img src={homeImg} alt="Home" />
              </a>
            </header>
            <main className={styles.registrationContent}>
              <section className={styles.sectionField}>
                <label htmlFor="">Email</label>
                <input
                  name="email"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Email"
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Password</label>
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
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Confirm Password</label>
                <div className={styles.sectionFieldPass}>
                  <input
                    name="passwordConfirmation"
                    onChange={changeHandler}
                    type={visibleConfirmPass ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  <p id="passwordConfirmation" onClick={tooglePasswordVisible}>
                    {visibleConfirmPass ? 'Hide' : 'Show'}
                  </p>
                </div>
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Phone Number</label>
                <input
                  name="phoneNumber"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Phone Number"
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Nickname</label>
                <input
                  name="nickname"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Nickname"
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">First Name</label>
                <input
                  name="name"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Name"
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Last Name</label>
                <input
                  name="surname"
                  onChange={changeHandler}
                  type="text"
                  placeholder="Surname"
                />
              </section>
              <section className={styles.sectionField}>
                <label htmlFor="">Date of birth</label>
                <input name="birthday" onChange={changeHandler} type="date" />
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
