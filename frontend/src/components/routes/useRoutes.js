import {
  Routes as Switch,
  Route, Navigate
} from 'react-router-dom';
import ContinueWatching from '../continue-watching/ContinueWatching';
import Description from '../home-page/components/list-item/components/list-item-description/Description';
import Homepage from '../home-page/HomePage';
import Loginpage from '../login-page/LoginPage';
import Regpage from '../registration-page/RegistrationPage';
import Video from '../video-player/Video';

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/browse" element={<Homepage type="Browse"/>} exact />
        <Route path="/browse/:id" element={<Description />} exact />
        <Route path="/watch/:id" element={<Video/>} exact />
        <Route path="/movie" element={<Homepage type="Film"/>} exact />
        <Route path="/serial" element={<Homepage type="Serial"/>} exact />
        <Route path="/my-list" element={<ContinueWatching title="My List"/>} exact />
        <Route path="/continue-watching" element={<ContinueWatching title="Continue Watching"/>} exact />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" element={<Regpage />} exact />
      <Route index path="/sign-in" element={<Loginpage />} exact />
      <Route path="/" element={<Navigate to ="/sign-in" />}/>
    </Switch>
  ); 
}
