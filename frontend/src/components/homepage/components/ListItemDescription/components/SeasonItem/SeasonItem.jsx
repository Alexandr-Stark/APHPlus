import styles from "./styles.module.scss";
import {
  PlayArrow
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function SeasonItem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.listItem}
      style={{ left: isHovered && index * 225  + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
        alt=""
      />
      {isHovered && (
        <>
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
              <Link to="/watch">
              <PlayArrow className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.itemInfoTop}>
              <span>1 hour 14 mins</span>
              <span className={styles.limit}>+16</span>
              <span>1999</span>
            </div>
            <div className={styles.desc}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
