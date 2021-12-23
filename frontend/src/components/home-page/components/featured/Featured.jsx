/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import {useState, useEffect, useContext, useCallback, useRef } from 'react'
import {useNavigate, generatePath, useLocation, Link}from 'react-router-dom';
import { AuthContext } from "../../../../context/AuthContext";
import { useHttp } from "../../../../hooks/http.hook";
import styles from "./styles.module.scss";

const useRecursiveTimeout = (callback, delay = 1000) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      const ret = ref.current();

      const nextDelay = Math.floor(Math.random() * (delay * 2)) + 1;
      if (!ret) {
        setTimeout(tick, nextDelay);
      } else if (ret.constructor === Promise) {
        ret.then(() => setTimeout(tick, nextDelay));
      }
    };

    const timer = setTimeout(tick, delay);

    return () => clearTimeout(timer);
  }, [delay]);
};

function Featured({ movies, type }) {
  const [movieId, setMovieId] = useState(0);
  const [episodeId, setEpisodeId] = useState(null);
  const [isSerial, setIsSerial] = useState(null);

  const {loading, request} = useHttp();
  const auth = useContext(AuthContext);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();
  const search = useLocation().search;

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  useRecursiveTimeout(() => setMovieId(getRndInteger(0, movies.length)), 10000);

  const getGenres = useCallback(
    async () => {
       try {
        const data = await request('/api/genre/', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
        })
        setGenres(data);
        //console.log(data);
       } catch (error) {
           // eslint-disable-next-line no-console
           console.log(error);
       }
    },
    [request, auth.token]
);

const lastViewedEpisode = useCallback(
  async () => {
     try {
      const data = await request(`/api/movie/last-viewed-episode/${movies[movieId]?._id}?userId=${auth.userId}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`
      })
      setEpisodeId(data);
      // eslint-disable-next-line no-console
      //console.log(data);
     } catch (error) {
        //  throw error;
     }
  },
  [request, auth.token, type]
);

useEffect(() => {
  movies[movieId]?.type === "Serial" && lastViewedEpisode();
}, [movieId])

  useEffect(()=>{
    getGenres();
    const name = new URLSearchParams(search).get('genre');
    if(name === 'Genre') {
      type === 'Serial' && navigate('/serial');
      type === 'Film' && navigate('/movie');
      type === 'Browse' && navigate('/browse');
    }
  }, [search, getGenres]);

  const handleSelection = (event) => {
    navigate(generatePath('?genre=:value', { value: event.target.value }))
  }

  return (
    <div className={styles.featured}>
        <div className={styles.category}>
          <span>{isSerial ? "Movies" : "Series"}</span>
          <select onChange={handleSelection} name="genre" id="genre">
            <option>Genre</option>
            {genres.map( (item) => <option key={item._id} value={item.title}>{item.title}</option> )}
          </select>
        </div>
      <img
        src={movies[movieId]?.poster}
        alt="No find poster"
      />
      <div className={styles.info}>
        <p>{movies[movieId]?.title}</p>
        <span className={styles.desc}>
        {movies[movieId]?.movieDescription}
        </span>
        <div className={styles.buttons}>
          <Link to={`/watch/${movies[movieId]?._id}${movies[movieId]?.type === "Serial" ? `?episode=${episodeId}` : ''}`}>
          <button className={styles.play}>
            <PlayArrow />
            <span>Play</span>
          </button>
          </Link>
          <Link to={`/browse/${movies[movieId]?._id}`}>
          <button className={styles.more}>
            <InfoOutlined />
            <span>Info</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Featured;