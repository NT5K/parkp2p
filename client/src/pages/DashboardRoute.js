import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Account from "./../components/Dashboard_Account"
import Driveway from './../components/Dashboard_Driveway'
import Subscription from './../components/Dashboard_Subscription'
import Account_Cancel from "./../components/Dashboard_Account_Cancel"
import "./styles.css";
import SideBar from "../components/Sidebar";
import Navbar from './../components/Dashboard_Nav_Top'

function Sidebar() {
    return (
        <BrowserRouter>
            <div>
            <SideBar />
            <Navbar />
                <Route exact path="/dash" component={Account} />
                <Route exact path="/dash/driveway" component={Driveway} />
                <Route exact path="/dash/subscription" component={Subscription} />
                <Route exact path="/dash/cancel" component={Account_Cancel} />
                <Route exact path="/dash/profits" component={Account} />
            </div>
        </BrowserRouter>
    );
}

export default Sidebar