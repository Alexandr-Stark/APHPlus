/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';
import Loginpage from './components/login-page/LoginPage';
import Regpage from './components/registration-page/RegistrationPage';

import { useRoutes } from './components/routes/useRoutes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  // eslint-disable-next-line no-console
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, ready, isAuthenticated
    }}>
      <Router>
        <div className="App">
          {routes} 
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
