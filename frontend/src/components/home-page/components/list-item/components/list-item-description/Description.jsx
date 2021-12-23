/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import {
  ArrowBackOutlined,
  PlayArrow,
  // eslint-disable-next-line no-unused-vars
  Add,
} from '@material-ui/icons';
import styles from './styles.module.scss';
import Season from "./components/season/Season";
import { Link } from 'react-router-dom';

import { React, useContext, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../../../../../context/AuthContext';
import { useHttp } from '../../../../../../hooks/http.hook';

// eslint-disable-next-line no-unused-vars
function Description({ index, type }) {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [movie, setMovie] = useState(null);
  const [episodeId, setEpisodeId] = useState(null);
  const params = useParams();
  const isSerial = movie?.type === "Serial";

  const getMovie = useCallback(async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await request(`/api/movie/${params.id}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setMovie(data);
      // eslint-disable-next-line no-console
      console.log(data);
    } catch (error) {
      throw error;
    }
  }, [request, auth.token]);

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
    [request, auth.token, movie]
);

async function addToFavorite() {
  try {
    const response = await request('/api/movie/add-to-favorite', 'POST', { userId: auth.userId, movieId: movie?._id }, 
    {
      Authorization: `Bearer ${auth.token}`
  });
    console.log(response.message)
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  useEffect(() => {
    if(isSerial) lastViewedEpisode();
  }, [lastViewedEpisode])

  return (
    <div className={styles.desc}>
      <Link to="/browse">
        <ArrowBackOutlined className={styles.backicon} />
      </Link>
      <div className={styles.videoWrapper}>
        <div className={styles.title}>{movie?.title}</div>
        <video src={movie?.trailers[movie?.trailers.length-1].trailer} autoPlay={true} loop className={styles.player} />
        <div className={styles.icons}>
          <div className={styles.buttons}>
           <Link to={`/watch/${movie?._id}${isSerial ? `?episode=${episodeId}` : ''}`}>
              <button className={styles.play}>
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>
            <button onClick={addToFavorite} className={styles.more}>
              <Add />
              <span>Favorite</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.titledesc}>
          <div className={styles.itemInfoTop}>
            <span>Description</span>
            <span className={styles.limit}>{movie?.ageRating}+</span>
            <span>{new Date(movie?.releaseDate).getFullYear()}</span>
          </div>
          <p>{movie?.movieDescription}</p>
        </div>
        <div className={styles.SecondaryInfo}>
          <div>
            <p>
              <span className={styles.grey}>Casting: </span>
              {movie?.cast.map((i, ind) =>
                ind === movie?.cast.length - 1
                  ? ` ${i.actorId.name} - ${i.asCharacter}`
                  : ` ${i.actorId.name} - ${i.asCharacter}, `,
              )}
            </p>
          </div>
          <div>
            <p>
              <span className={styles.grey}>Ganres: </span>
              {movie?.genres.map((i, ind) =>
                ind === movie?.genres.length - 1
                  ? ` ${i.title}`
                  : ` ${i.title}, `,
              )}
            </p>
          </div>
          <div>
            <p>
              <span className={styles.grey}>IMDB: </span>
               {movie?.apiIMDbId} ⭐
            </p>
          </div>
        </div>
      </div>
      {isSerial &&(<>
        {movie?.seasons.map( (item) => (<Season key={item._id} movieId={movie?._id} season={item}/>))}
      </>)}
    </div>
  );
}

export default Description;
