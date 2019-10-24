import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Account from "./components/Dashboard_Account"
import DashboardRoute from './pages/DashboardRoute'
import Page404 from './pages/Page404'
import storeFront from './pages/storeFront'
import BackgroundProcess from './components/Background_Process'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <BackgroundProcess/>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard/account" component={Account} />
            <Route path="/dash" component={DashboardRoute} />
            <Route exact path="/about" component={storeFront} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
