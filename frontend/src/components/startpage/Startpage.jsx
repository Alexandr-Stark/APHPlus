/* eslint-disable no-unused-vars */
import React from 'react';
import Adverts from './components/Adverts/Adverts';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import Faq from './components/FAQ/Faq';
import Footer from './components/Footer/Footer';

function Start() {
  //<FooterContainer />
  return (
    <div className={styles.body}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.container}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
              className={styles.logo}
            />
            <Link to="/sign-in" className={styles.buttonlink}>
              Sign In
            </Link>
          </div>
          <div className={styles.feature}>
            <h1 className={styles.title}>
              Unlimited films, TV programmes and more.
            </h1>
            <h2 className={styles.subTitle}>
              Watch anywhere. Cancel at any time.
            </h2>
            <div className={styles.optForm}>
              <input className={styles.input} placeholder="Email address" />
              <button className={styles.button}>Try it now</button>
              <p className={styles.text}>
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Adverts />
      <Faq />
      <Footer />
    </div>
  );
}
export default Start;
