import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard"
import Account from "./pages/DashboardAccount"
import Driveway from "./pages/DashboardDriveways"
import addDriveway from "./pages/DashboardAddDriveway"


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/account" component={Account} />
            <Route exact path="/dashboard/driveways" component={Driveway} />
            <Route exact path="/dashboard/add-driveway" component={addDriveway} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
