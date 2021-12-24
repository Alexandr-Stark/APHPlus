import styles from "./styles.module.scss";
import {
  PlayArrow,
  Done,
  Remove
} from "@material-ui/icons";
import { useState, useContext, useEffect, useCallback } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, Link} from 'react-router-dom';

function Item({ movie, removeControl }) {
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [episodeId, setEpisodeId] = useState(null);
  const navigate = useNavigate();

  const isSerial = movie?.type === 'Serial' ? true : false;

  function watchDescription() {
    navigate(`/browse?descr=${movie?._id}`)
  }

  const lastViewedEpisode = useCallback(
    async () => {
       // eslint-disable-next-line no-useless-catch
       try {
        const data = await request(`/api/movie/last-viewed-episode/${movie?._id}?userId=${auth.userId}`, 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setEpisodeId(data);
       } catch (error) {
          //  throw error;
       }
    },
    [request, auth.token]
);

useEffect(() => {
  if(isSerial) lastViewedEpisode();
}, [lastViewedEpisode])

  return (
    <div
      className={styles.listItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie?.poster}
        alt=""
      />
      {isHovered && (
        <div className={styles.hovered}>
        <img className={styles.img}
          src={movie?.poster}
        />
          <video src={movie?.trailers[movie?.trailers.length-1].trailer} autoPlay={true} loop />
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
            <Link to={`/watch/${movie?._id}${isSerial ? `?episode=${episodeId}` : ''}`}>
              <PlayArrow className={styles.icon}/>
              </Link>
              <Remove onClick={removeControl} className={styles.icon}/>
              <Link to={`/browse/${movie?._id}`}>
                <Done onClick={watchDescription} className={styles.icon} />
              </Link>
            </div>
            <div className={styles.itemInfoTop}>
              {isSerial &&  <span>{movie?.seasons.length} seasons</span>}
              <span className={styles.limit}>{movie?.ageRating}+</span>
              <span>{new Date(movie?.releaseDate).getFullYear()}</span>
              <span className={styles.rating}>| {movie?.apiIMDbId} <p>⭐</p></span>
            </div>
            <div className={styles.desc}>
            {movie?.movieDescription}
            </div>
            <div className={styles.genre}>{movie?.genres.map( (i, ind) => ind === movie?.genres.length - 1 ? ` ${i.title}` : ` ${i.title} • `)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Item;