/* eslint-disable no-unused-vars */
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
// eslint-disable-next-line no-unused-vars
import {React, useContext, useCallback, useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom' 
import { AuthContext } from "../../../../context/AuthContext";
import styles from "./styles.module.scss";

function Navbar(){
  const [isScrolled, setIsScrolled] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  function logoutHandler(event){
    event.preventDefault();
    auth.logout();
    navigate('/');
}
  return (
    <div className={isScrolled ? `${styles.navbar} ${styles.scrolled}` : styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            src="https://asd-internship.fra1.digitaloceanspaces.com/aphlogo.png"
            alt=""
          />
          <div className={styles.menu}>
            <div className={styles.menuTrigger}>
              <span>Watch</span>
              <ArrowDropDown className={styles.icon} />
            </div>
            <div className={styles.menuLinks}>
            <Link to="/browse">
              <span>Homepage</span>
            </Link>
            <Link to="/serial">
              <span>Serials</span>
            </Link>
            <Link to="/movie">
              <span>Movies</span>
            </Link>
            <Link to="/continue-watching">
              <span>Continue Watching</span>
            </Link>
              <Link to="/my-list">
              <span>My List</span>
            </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Search className={styles.icon} />
          {/* <span>Kids</span>
          <Notifications className={styles.icon} /> */}
          <img
            src="https://occ-0-4012-1432.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png"
            alt=""
          />
          <div className={styles.profile}>
            <ArrowDropDown className={styles.icon} />
            <div className={styles.options}>
              <a href="/" onClick={logoutHandler}>Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;