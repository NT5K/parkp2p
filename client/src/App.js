import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard"
import Account from "./components/Dashboard_Account"
import Account_Cancel from "./components/Dashboard_Account_Cancel"
import Driveway from "./pages/DashboardDriveways"
import addDriveway from "./pages/DashboardAddDriveway"
import dashboardRoute from "./pages/DashboardRoute"


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
            <Route exact path="/dashboard/account-cancel" component={Account_Cancel} />
            {/* <Route exact path="/dashboard/route" component={dashboardRoute} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
