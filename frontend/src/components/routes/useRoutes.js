import {
  Routes as Switch,
  Route,
} from 'react-router-dom';
import Loginpage from '../loginpage/Loginpage';
import Regpage from '../registrationpage/RegistrationPage';

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/browse" element={<div>Home</div>} exact />
        <Route path="/movie" element={<div>Movies</div>} exact />
        <Route path="/serial" element={<div>Serials</div>} exact />
        <Route path="/my-list" element={<div>My list</div>} exact />
        <Route path="/continue-watching" element={<div>Continue watching</div>} exact />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" element={<div>Home</div>} exact />
      <Route path="/sign-up" element={<Regpage />} exact />
      <Route index path="/sign-in" element={<Loginpage />} exact />
    </Switch>
  ); 
}
