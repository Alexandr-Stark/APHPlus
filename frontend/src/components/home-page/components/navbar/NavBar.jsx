import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
// eslint-disable-next-line no-unused-vars
import {React, useContext, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom' 
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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <div className={styles.menu}>
            <div className={styles.menuTrigger}>
              <span>Watch</span>
              <ArrowDropDown className={styles.icon} />
            </div>
            <div className={styles.menuLinks}>
              <span>Homepage</span>
              <span>Series</span>
              <span>Movies</span>
              <span>New and Popular</span>
              <span>My List</span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Search className={styles.icon} />
          <span>Kids</span>
          <Notifications className={styles.icon} />
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