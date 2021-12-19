/* eslint-disable no-console */
/* eslint-disable no-useless-catch */

import {React, useContext, useCallback, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import Featured from './components/featured/Featured';
import List from './components/list/List';
import Navbar from './components/navbar/NavBar';

import styles from './styles.module.scss'

function Homepage(){
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [movies, setMovies] = useState([]);

    const getMovies = useCallback(
        async () => {
           try {
            const data = await request('/api/movie/', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setMovies(data);
            // eslint-disable-next-line no-console
            //console.log(data);
           } catch (error) {
               throw error;
           }
        },
        [request, auth.token]
    );

    useEffect(() => {
        getMovies();
    }, [getMovies])

    const handleAgeRating = (movies) => {
        console.log('AgeRating > 15', movies.filter( (item) => item.ageRating > 15 && item));
        return movies.filter( (item) => item.ageRating > 15 && item);
    }

    const handleImdbRating = (movies) => {
        console.log('ImdbRating > 8', movies.filter( (item) => item.apiIMDbId > 8 && item));
        return movies.filter( (item) => item.apiIMDbId > 8 && item);
    }

    const handleReleasesLastYear = (movies) => {
        console.log('ReleasesLastYear', movies.filter( (item) => new Date(item.releaseDate).getFullYear() === (new Date().getFullYear() - 1) && item));
        return movies.filter( (item) => new Date(item.releaseDate).getFullYear() === (new Date().getFullYear() - 1) && item);
    }

    return (
        <div className={styles.home}>
          <Navbar />
          <Featured type={movies}/> 
          <List label="Age rating 16+" movies={handleAgeRating(movies)}/>
          <List label="IMDB Top Raiting"movies={handleImdbRating(movies)}/>
          <List label="Releases last year" movies={handleReleasesLastYear(movies)}/>
        </div>
      );
}

export default Homepage;