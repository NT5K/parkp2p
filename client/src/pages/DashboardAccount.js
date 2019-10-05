import React, { Component } from 'react';

import DashboardAccount from './../components/DashboardAccount/Dashboard'

class dashboard extends Component {
    render() {
        return (
            <div style={{backgroundColor : '#E8E8E8', height : '800px'}}>
            <DashboardAccount />
            </div>
        );
    }
}

export default dashboard;