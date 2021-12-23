/* eslint-disable no-console */
/* eslint-disable no-useless-catch */

import {React, useContext, useCallback, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import Featured from './components/featured/Featured';
import List from './components/list/List';
import Navbar from './components/navbar/NavBar';

import styles from './styles.module.scss'

function Homepage( {type} ){
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [movies, setMovies] = useState([]);

    const getMovies = useCallback(
        async () => {
           try {
            const data = await request('/api/movie/', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            if(type === 'Film'){
                setMovies(data.filter( (item) => item.type === 'Film'));
                return;
            }
            if(type === 'Serial'){
                setMovies(data.filter( (item) => item.type === 'Serial'));
                return;
            }
            setMovies(data);
            // eslint-disable-next-line no-console
            //console.log(data);
           } catch (error) {
               throw error;
           }
        },
        [request, auth.token, type]
    );

    useEffect(() => {
        getMovies();
    }, [getMovies])

    const handleAgeRating = (movies) => {
        return movies.filter( (item) => item.ageRating > 15 && item);
    }

    const handleImdbRating = (movies) => {
        return movies.filter( (item) => item.apiIMDbId > 8 && item);
    }

    const handleReleasesLastYear = (movies) => {
        return movies.filter( (item) => new Date(item.releaseDate).getFullYear() === (new Date().getFullYear() - 1) && item);
    }

    return (
        <div className={styles.home}>
          <Navbar />
          <Featured type={type} movies={movies}/> 
          <List label="Age rating 16+" movies={handleAgeRating(movies)}/>
          <List label="IMDB Top Raiting"movies={handleImdbRating(movies)}/>
          <List label="Releases last year" movies={handleReleasesLastYear(movies)}/>
        </div>
      );
}

export default Homepage;