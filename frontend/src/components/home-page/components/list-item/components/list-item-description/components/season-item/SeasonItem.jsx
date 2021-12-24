import styles from "./styles.module.scss";
import {
  PlayArrow
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function SeasonItem({ index, movieId, episode }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.listItem}
      style={{ left: isHovered && index * 225  + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={episode?.poster}
        alt=""
      />
      {isHovered && (
        <div className={styles.hovered}>
          <img className={styles.img}
            src={episode?.poster}
          />
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
              <Link to={`/watch/${movieId}?episode=${episode?._id}`}>
              <PlayArrow className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.itemInfoTop}>
              <span>{episode?.episodeNumber}. {episode?.title}</span>
              <span className={styles.limit}>{episode?.ageRating}+</span>
              <span>{new Date(episode?.releaseDate).getFullYear()}</span>
            </div>
            <div className={styles.desc}>
            {episode?.episodeDescription}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}