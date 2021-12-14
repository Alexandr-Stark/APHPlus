import {React, useContext} from 'react';
import {useNavigate} from 'react-router-dom' 
import { AuthContext } from '../../context/AuthContext';

function Homepage(){

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function logoutHandler(event){
        event.preventDefault();
        auth.logout();
        navigate('/');
    }
    return (
        <div><a href="/" onClick={logoutHandler}>Logout</a></div>
    );
}

export default Homepage;