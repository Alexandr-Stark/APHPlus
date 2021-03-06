/* eslint-disable no-useless-catch */
import {useContext, useState, useCallback, useEffect} from 'react';
import { ArrowBackOutlined } from "@material-ui/icons";
import styles from "./styles.module.scss";
import { useLocation, useParams, Link}from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from '../../hooks/http.hook';

function Video() {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const params = useParams();
  const search = useLocation().search;
 const [isSerial, setIsSerial] = useState(null);

  const getMovie = useCallback(async () => {
    try {
      const data = await request(`/api/movie/${params.id}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setMovie(data);
      setIsSerial(data?.type === 'Serial' || false);
      getCurrentMovieTime(data?.type === 'Serial' ? true : false);
    } catch (error) {
      throw error;
    }
  }, [request, auth.token]);

  const getEpisodeCredentials = useCallback(
    async () => {
       try {
        const data = await request(`/api/movie/episode-credentials/${movie?._id}?userId=${auth.userId}&episodeId=${new URLSearchParams(search).get('episode')}`, 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setEpisode(data);
       } catch (error) {
          //  throw error;
       }
    },
    [request, auth.token, movie]
  );

  const getCurrentMovieTime = useCallback(async (isSerial) => {
    try {
      const data = await request(`/api/movie/video-current-time/${params.id}?userId=${auth.userId}${isSerial ? `&episodeId=${new URLSearchParams(search).get('episode')}` : ''}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setVideoCurrentTime(data);
    } catch (error) {
      throw error;
    }
  }, [request, auth.token]);

  const storeCurrentMovieTime = async (currentTime) => {
    const parameters = {
      userId: auth.userId,
      filmId: null,
      serialId: null,
      episodeId: null,
      currentTime: 0
    };
    if(movie?.type === 'Serial'){
      parameters.serialId = movie?._id;
      parameters.episodeId = new URLSearchParams(search).get('episode');
      parameters.currentTime = currentTime; 
      try {
          await request(`api/movie/video-current-time`, 'POST', {...parameters}, {
          Authorization: `Bearer ${auth.token}`,
        });
      } catch (error) {
        throw error;
      }
      return;
    }

    parameters.filmId = movie?._id;
    parameters.currentTime = currentTime;
    try {
        await request(`api/movie/video-current-time`, 'POST', {...parameters}, {
        Authorization: `Bearer ${auth.token}`,
      });
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    movie?.type === "Serial" && getEpisodeCredentials();
  }, [movie])

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  const goBack = ()=>{
    const time = document.getElementById("#player").currentTime;
    storeCurrentMovieTime(time);
  }

  return (
    <div className={styles.watch}>
      <div className={styles.back} onClick={goBack}>
        <Link to={"/browse"}>
        <ArrowBackOutlined />
        <p>{movie?.title}{isSerial ? ` -  #${episode?.episodeNumber} ${episode?.title}` : ''}</p>
        </Link>
      </div>
      <video
        className={styles.video}
        id="#player"
        src={`${isSerial ? episode?.episode : movie?.film}#t=${videoCurrentTime}`}
        controls
        controlsList="nodownload"
        />
    </div>
  );
}
export default Video;