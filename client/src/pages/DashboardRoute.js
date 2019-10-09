import React, { Component } from 'react';

import Dashboard_Nav_Top from '../components/Dashboard_Nav_Top'
import Dashboard_Nav_Side from '../components/Dashboard_Nav_Side'

import Profits from '../components/Dashboard/Dashboard'
import Account from "./../components/Dashboard_Account"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Dashboard_Nav_Top />
                <Dashboard_Nav_Side />

                <Router>
                    <Switch>
                        <Route exact path="/dashboard/" component={Profits} />
                        <Route exact path="/dashboard/account" component={Account} />
                    </Switch>
                </Router>
           </div>
            
        );
    }
}

export default Dashboard;