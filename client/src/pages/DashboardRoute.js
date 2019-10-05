import React, { Component } from 'react';
import DashboardNav from '../components/DashboardNav'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashboardNav />
                <Router>
            
                    <Switch>

                    </Switch>
                </Router>
           </div>
            
        );
    }
}

export default Dashboard;