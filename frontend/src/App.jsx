import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './components/routes/useRoutes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, ready, isAuthenticated
    }}>
      <Router>
        <div className="app">
          {routes} 
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
