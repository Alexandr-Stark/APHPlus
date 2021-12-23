/* eslint-disable no-unused-vars */
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

function Item({ movie, index, removeControl }) {
  const {request, loading} = useHttp();
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
        // eslint-disable-next-line no-console
        //console.log(data);
       } catch (error) {
           throw error;
       }
    },
    [request, auth.token]
);

useEffect(() => {
  if(isSerial) lastViewedEpisode();
}, [lastViewedEpisode])

  // const trailer =
  //   "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
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
        <>
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
              <span>1 hour 14 mins</span>
              <span className={styles.limit}>+16</span>
              <span>1999</span>
            </div>
            <div className={styles.desc}>
            {movie?.movieDescription}
            </div>
            <div className={styles.genre}>Action</div>
          </div>
        </>
      )}
    </div>
  );
}
export default Item;