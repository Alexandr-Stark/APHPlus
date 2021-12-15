import {
  Routes as Switch,
  Route,
} from 'react-router-dom';
import Home from '../homepage/Homepage';
import Loginpage from '../loginpage/Loginpage';
import Regpage from '../registrationpage/RegistrationPage';

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/browse" element={<Home />} exact />
        <Route path="/movie" element={<Home type={"movie"}/>} exact />
        <Route path="/serial" element={<Home type={"serials"}/>} exact />
        <Route path="/my-list" element={<div>My list</div>} exact />
        <Route path="/continue-watching" element={<div>Continue watching</div>} exact />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" element={<div>Blyat` sho za huinya</div>} exact />
      <Route path="/sign-up" element={<Regpage />} exact />
      <Route index path="/sign-in" element={<Loginpage />} exact />
    </Switch>
  ); 
}
