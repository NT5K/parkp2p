import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Account from "./components/Dashboard_Account"
// import Toolbar from "./components/Toolbar/Toolbar"
import Driveway from './components/Dashboard_Driveway'
import Subscription from './components/Dashboard_Subscription'
import Account_Cancel from "./components/Dashboard_Account_Cancel"
import Account_Driveway from "./pages/DashboardDriveways"
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
            <Route exact path="/dashboard/account" component={Account} />
            <Route exact path="/dash/driveways" component={Driveway} />
            <Route exact path="/dashboard/add-driveway" component={addDriveway} />
            <Route exact path="/dash/account-cancel" component={Account_Cancel} />
            <Route exact path="/dash/account-subscription" component={Subscription} />
            <Route exact path="/dashboard/driveway" component={Account_Driveway} />
            {/* <Route exact path="/toolbar" component={Toolbar} /> */}
            <Route exact path="/dash" component={Account} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
