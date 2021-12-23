/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import styles from "./styles.module.scss";
import {
  PlayArrow,
  Add,
  Done
} from "@material-ui/icons";
import { useState, useContext, useCallback, useEffect} from "react";
import {useNavigate, generatePath, useLocation, Link}from 'react-router-dom';
import { useHttp } from "../../../../hooks/http.hook";
import { AuthContext } from "../../../../context/AuthContext";

 function ListItem({ index, movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movieDuration, setMovieDuration] = useState('0 h 0 m');
  const [episodeId, setEpisodeId] = useState(null);
  const navigate = useNavigate();

  const isSerial = movie?.type === 'Serial' ? true : false;

  const {request} = useHttp();
  const auth = useContext(AuthContext);

  const lastViewedEpisode = useCallback(
    async () => {
       try {
        const data = await request(`/api/movie/last-viewed-episode/${movie?._id}?userId=${auth.userId}`, 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setEpisodeId(data);
        // eslint-disable-next-line no-console
        //console.log(data);
       } catch (error) {
           throw error;
       }
    },
    [request, auth.token, isSerial]
);

useEffect(() => {
  if(isSerial) lastViewedEpisode();
}, [lastViewedEpisode, isSerial])

    function getMovieDuration(){
      let duration = document.getElementById("#trailerPlayer")?.duration;
      let hours = Math.trunc(duration / 3600);
      let minutes = Math.trunc( ((duration / 3600) - hours) * 60);
      setMovieDuration(`${hours} h ${minutes} m`);
    }

    function watchDescription() {
      navigate(`/browse?descr=${movie?._id}`)
    }

    async function addToFavorite() {
      try {
        const response = await request('api/movie/add-to-favorite', 'POST', { userId: auth.userId, movieId: movie?._id }, 
        {
          Authorization: `Bearer ${auth.token}`
      });
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }

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
        <div className={styles.hovered}>
          <img className={styles.img}
            src={movie?.poster}
          />
          <video onPlay={getMovieDuration} id="#trailerPlayer" src={movie?.trailers[movie?.trailers.length-1].trailer} controls controlsList="nodownload" autoPlay="autoplay" muted loop />
          <div className={styles.itemInfo}>
            <div className={styles.icons}>
            <Link to={`/watch/${movie?._id}${isSerial ? `?episode=${episodeId}` : ''}`}>
              <PlayArrow className={styles.icon}/>
              </Link>
              <Add onClick={addToFavorite} className={styles.icon}/>
              <Link to={`/browse/${movie?._id}`}>
                <Done onClick={watchDescription} className={styles.icon} />
              </Link>
            </div>
            <div className={styles.itemInfoTop}>
              <span>{movie?.type === 'Film' ? movieDuration : `${movie?.seasons.length} seasons`}</span>
              <span className={styles.limit}>{movie?.ageRating}+</span>
              <span>{new Date(movie?.releaseDate).getFullYear()}</span>
              <span className={styles.rating}>| {movie?.apiIMDbId} <p>⭐</p></span>
            </div>
            <div className={styles.desc}>
            {movie?.title}
            </div>
            <div className={styles.genre}>{movie?.genres.map( (i, ind) => ind === movie?.genres.length - 1 ? ` ${i.title}` : ` ${i.title} • `)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;