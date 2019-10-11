import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Account from "./components/Dashboard_Account"
import Driveway from './components/Dashboard_Driveway'
import Subscription from './components/Dashboard_Subscription'
import Account_Cancel from "./components/Dashboard_Account_Cancel"
import addDriveway from "./pages/DashboardAddDriveway"
import DashboardRoute from './pages/DashboardRoute'
import SideBar from "./components/Sidebar";
import Navbar from './components/Dashboard_Nav_Top'
// import "./styles.css";

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
            <Route path="/dash" component={DashboardRoute} />
            {/* <Router>
              <div>
                <SideBar />
                <Navbar />
                <Route exact path="/dash" component={Account} />
                <Route exact path="/dash/driveway" component={Driveway} />
                <Route exact path="/dash/subscription" component={Subscription} />
                <Route exact path="/dash/cancel" component={Account_Cancel} />
                <Route exact path="/dash/profits" component={Account} />
              </div>
            </Router> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
