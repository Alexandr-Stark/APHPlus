/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import styles from "./styles.module.scss";
import tr from '../../../../assets/SPIDER-MAN - NO WAY HOME - Official Trailer (HD).mp4'
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";

 function ListItem({ index, movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movieDuration, setMovieDuration] = useState('0 hours 0 mins');

    function getMovieDuration(){
      let duration = document.getElementById("#trailerPlayer")?.duration;
      let hours = Math.trunc(duration / 3600);
      let minutes = Math.trunc( ((duration / 3600) - hours) * 60);
      setMovieDuration(`${hours} hours ${minutes} mins`);
    }

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div
      className={styles.listItem}
      style={{ left: isHovered && index * 225  + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie?.poster}
        alt=""
      />
      {isHovered && (
        <div>
          <video onPlay={getMovieDuration} id="#trailerPlayer" src="//storage.googleapis.com/media-session/caminandes/short.mp4#t=60.335772" autoPlay="autoplay" muted loop />
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
              <PlayArrow className={styles.icon}/>
              <Add className={styles.icon}/>
              <ThumbUpAltOutlined className={styles.icon} />
              <ThumbDownOutlined className={styles.icon} />
            </div>
            <div className={styles.itemInfoTop}>
              <span>{movie?.type === 'Film' ? movieDuration : `${movie?.seasons.length} seasons`}</span>
              <span className={styles.limit}>{movie?.ageRating}+</span>
              <span>{new Date(movie?.releaseDate).getFullYear()}</span>
            </div>
            <div className={styles.desc}>
              IMDB: {movie?.apiIMDbId} ⭐
            </div>
            <div className={styles.genre}>{movie?.genres.map( (i, ind) => ind === movie?.genres.length - 1 ? ` ${i.title}` : ` ${i.title} • `)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;