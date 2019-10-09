import React, { Component } from 'react';

import AddDriveway from './../components/DashboardAddDriveway/Dashboard'

class dashboard extends Component {
    render() {
        return (
            <div style={{backgroundColor : '#E8E8E8', height : '800px'}}>
            <AddDriveway />
            </div>
        );
    }
}

export default dashboard;