import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo from './4m-icon.png';
import Threads from './Threads';
import Login from './Login';
import Signup from './Signup';

import './App.css';

function NavBar() {
  return (
    <ul>
      <div>
        <Link to="/">Home</Link> | <Link to="/login">Sign in</Link> | <Link to="/login/signup">Sign up</Link>
      </div>
    </ul>
  )
}

function App() {
  return (
    <div className="App">
      <h1>
        <img id='HeadLogo' alt='4M logo' src={logo} />
        4M Forum
      </h1>
      <Router>
        <NavBar />
        <Switch>

          <Route exact path="/">
            <Threads />
          </Route>

          <Route exact path="/login/signup" component={Signup} />

          {/* <Route exact path="/login">
            <Login />
          </Route> */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;
