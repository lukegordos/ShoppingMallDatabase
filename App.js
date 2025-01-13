import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import AdminPage from './components/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Sign Up</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <SignupForm />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;