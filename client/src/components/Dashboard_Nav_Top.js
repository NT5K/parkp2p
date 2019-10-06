import React, { Component } from 'react';

const headerStyle = {
    backgroundColor: 'black',
    zIndex: 1,
    boxShadow: '5px 5px 8px -2px gray'
}

class DashboardNav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyle}>
                    <div className="col-xl-2 no-gutter border-right"></div>

                    <div className="col-xl-10 no-gutter">
                        <h2 className=" text-white text-center">Dashboard</h2>
                    </div>
                </nav>
            </div>
        )
    }
}

export default DashboardNav;