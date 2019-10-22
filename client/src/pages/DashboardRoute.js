import React from "react";
import { BrowserRouter, Route /* Switch */ } from "react-router-dom";
import Profits from "./../components/Dashboard_Profits"
import Account from "./../components/Dashboard_Account"
import Driveway from './../components/Dashboard_Driveway'
import Reservations from './../components/Dashboard_Reservations'
import Car from './../components/Dashboard_Car'
import Subscription from './../components/Dashboard_Subscription'
import Account_Cancel from "./../components/Dashboard_Account_Cancel"
import "./DashboardStyles.css";
import SideBar from "../components/Sidebar";
import Navbar from './../components/Dashboard_Nav_Top'
// import Page404 from './Page404'
// import BackgroundProcess from './../components/Background_Proccess'

function Sidebar() {
    return (
        <BrowserRouter>
            <div>
            <SideBar />
            <Navbar />
                {/* <Route exact path="/dash/profits" component={component goes here} /> */}
                <Route exact path="/dash/profits" component={Profits} />
                <Route exact path="/dash/" component={Account} />
                <Route exact path="/dash/driveway" component={Driveway} />
                <Route exact path="/dash/subscription" component={Subscription} />
                <Route exact path="/dash/cancel" component={Account_Cancel} />
                <Route exact path="/dash/reservations" component={Reservations} />
                <Route exact path="/dash/car" component={Car} />
                {/* <Route component={Page404} /> */}
            </div>
        </BrowserRouter>
    );
}

export default Sidebar