import {React, useContext, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom' 
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

function Homepage(){

    // eslint-disable-next-line no-unused-vars
    const {loading, request} = useHttp();
    const auth = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    function logoutHandler(event){
        event.preventDefault();
        auth.logout();
        navigate('/');
    }

    const getMovies = useCallback(
        async () => {
           try {
            // eslint-disable-next-line no-console
            const data = await request('/api/movie/', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setMovies(data);
           } catch (error) {
               // eslint-disable-next-line no-console
               console.log(error);
           }
        },
        [request, auth.token]
    );

    useEffect(() => {
        getMovies();
    }, [getMovies])

    return (
        <div>
            <a href="/" onClick={logoutHandler}>Logout</a>
            {movies.map( (item) => {return (
            <div key={item._id}>
                <p>{item.title}</p>
                <p>
                    <img width="300px" src={item.poster} alt="poster" />
                </p>
                <p>Description: {item.movieDescription}</p>
                <p>Age Rating: {item.ageRating}</p>
                <video width="600px" controls="controls"><source src={item.film} type="video/mp4"/></video>
            </div>
            )})}
        </div>
    );
}

export default Homepage;