import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';
import Regpage from './components/regpage/Regpage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/reg" element={<Regpage />}/>
      </Switch>
    </Router>
  );
}

export default App;
