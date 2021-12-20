/* eslint-disable no-unused-vars */
import {
  Routes as Switch,
  Route,
} from 'react-router-dom';
import ContinueWatching from '../homepage/components/continue-watching/ContinueWatching';
import Home from '../homepage/Homepage';
import Loginpage from '../loginpage/Loginpage';
import Regpage from '../registrationpage/RegistrationPage';
import Video from '../Video/Video';
import Start from '../startpage/Startpage';
import Description from "../homepage/components/ListItemDescription/Description"

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/browse" element={<Home />} exact />
        <Route path="/movie" element={<Home type={"movie"}/>} exact />
        <Route path="/serial" element={<Home type={"serials"}/>} exact />
        <Route path="/my-list" element={<ContinueWatching title="My List"/>} exact />
        <Route path="/continue-watching" element={<ContinueWatching title="Continue watching"/>} exact />
        <Route path="/watch" element={<Video />} exact />
        <Route path="/description" element={<Description type={"serial"}/>} exact />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" element={<Start />} />
      <Route path="/sign-up" element={<Regpage />} exact />
      <Route index path="/sign-in" element={<Loginpage />} exact />
    </Switch>
  ); 
}
