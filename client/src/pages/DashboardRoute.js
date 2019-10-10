import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from "./../components/Dashboard_Account"
import Driveway from './../components/Dashboard_Driveway'
import Subscription from './../components/Dashboard_Subscription'
import Account_Cancel from "./../components/Dashboard_Account_Cancel"
import "./styles.css";
import SideBar from "../components/Sidebar";
import Navbar from './../components/Dashboard_Nav_Top'

function Sidebar() {
    return (
    //    <div>
    //        <SideBar />
    //        <Navbar />
    //    </div>
        <Router>
            <div>
                <SideBar />
                <Navbar />
                <Switch>
                    <Route exact path="/dashboard/account" component={Account} />
                    <Route exact path="/dashboard/driveway" component={Driveway} />
                    <Route exact path="/dashboard/subscription" component={Subscription} />
                    <Route exact path="/dashboard/cancel" component={Account_Cancel} />
                    <Route exact path="/dashboard/profits" component={Account} />
                  
                </Switch>
            </div>
        </Router>
    );
}

export default Sidebar