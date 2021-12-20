/* eslint-disable no-unused-vars */
import styles from "./styles.module.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ArrowDropDown
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Item({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div
      className={styles.listItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
        alt=""
      />
      {isHovered && (
        <div className={styles.hovered}>
          <img
            src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
            alt=""
          />
          <video src={trailer} autoPlay={true} loop />
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
              <Link to="/watch">
                <PlayArrow className={styles.icon}/>
              </Link>
              <Add className={styles.icon}/>
              <ThumbUpAltOutlined className={styles.icon} />
              <ThumbDownOutlined className={styles.icon} />
              <Link to="/description">
                <ArrowDropDown className={styles.openIcon}/>
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
            <div className={styles.genre}>Action</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Item;