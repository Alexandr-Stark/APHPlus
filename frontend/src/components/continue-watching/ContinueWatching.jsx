/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import { useHttp } from "../../hooks/http.hook";
import {useState, useContext, useCallback, useEffect} from 'react';
import Navbar from "../home-page/components/navbar/NavBar";
import Item from "./components/Item";
import styles from  './styles.module.scss';
import { AuthContext } from "../../context/AuthContext";

function ContinueWatching({title}) {
    const {request, loading} = useHttp();
    const auth = useContext(AuthContext);
    const [movies, setMovies] = useState([]);

    const getMovies = useCallback(
        async () => {
           try {
             let listMoviesId = null;
             if(title === 'Continue Watching'){
                listMoviesId = await request(`/api/movie/contunue-watching/${auth.userId}`, 'GET', null, {
                  Authorization: `Bearer ${auth.token}`
                })
             }
             if(title === 'My List'){
              listMoviesId = await request(`/api/movie/my-list/${auth.userId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
              })
           }
            if(!loading) {
                const data = await request(`/api/movie/favorite/getall?moviesId=${listMoviesId.map( (i, ind) => ind === listMoviesId.length-1 ? `${i}`: `${i}&moviesId=`).join('')}`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })
                setMovies(data);
            }
           } catch (error) {
              //  throw error;
              console.log(error);
              setMovies([]);
           }
        },
        [request, auth.token, title]
    );

    async function removeFromFavorite(movieId) {
      try {
        const response = await request('api/movie/remove-from-favorite', 'POST', { userId: auth.userId, movieId: movieId }, 
        {
          Authorization: `Bearer ${auth.token}`
      });
      getMovies();
        // eslint-disable-next-line no-console
        console.log(response.message)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    async function removeFromContinueWatching(movieId, movieType) {
      try {
        const response = await request('api/movie/remove-from-contunue-watching', 'POST', { userId: auth.userId, movieId: movieId, isSerial: movieType}, 
        {
          Authorization: `Bearer ${auth.token}`
      });
      getMovies();
        // eslint-disable-next-line no-console
        console.log(response.message)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    useEffect(() => {
        getMovies();
    }, [getMovies])

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        {movies.map( (movie, index) => (<Item key={movie?._id} movie={movie} removeControl={() => title === 'Continue Watching' ? removeFromContinueWatching(movie?._id, movie?.type === 'Serial') : removeFromFavorite(movie?._id)} index={index}/>))}
      </div>
    </div>
  );
}

export default ContinueWatching;