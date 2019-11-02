import React from 'react';
import './css/App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import Account from './pages/Account';

class App extends React.Component {

  render(){
    return (
      <Router>
        <div className="App">
            <Route path="/" exact={true} component={Login} />
            <Route path="/signup" exact={true} component={Signup} />
            <Route path="/app" exact={true} component={MainPage} />
            <Route path="/search" exact={true} component={SearchPage} />
        </div>
      </Router>
    );
  }
}

export default App;
