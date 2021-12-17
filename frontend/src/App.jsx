/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';
import Loginpage from './components/loginpage/Loginpage';
import "./app.scss";
import Regpage from './components/registrationpage/RegistrationPage';
import ScrollToTop from "./components/routes/ScrollToTop";

import { useRoutes } from './components/routes/useRoutes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

function App() {
  const {token, login, logout, userId} = useAuth();
  // eslint-disable-next-line no-console
  const isAuthenticated = true;//!!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <ScrollToTop />
        <div className="App">
          {routes} 
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
