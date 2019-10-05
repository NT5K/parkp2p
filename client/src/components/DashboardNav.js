import React, { Component } from 'react';
import { getFromStorage } from '../utils/storage'
import 'whatwg-fetch';
import store from 'store'
import { Redirect } from 'react-router-dom'

// const key = store.get('park_p2p')

const styles = {

    shadow: {
        boxShadow: "1px 1px 1px #9E9E9E"
    },
    zIndex: {
        zIndex: 1
    },
    zIndexCollapse: {
        zIndex: 2
    }
}

const headerStyle = {
    backgroundColor: 'black',
    height: '60px',
    boxShadow: '5px 8px 8px -2px gray'
}

const sidebarStyle = {
    height: '100vh',
    color: 'black',

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

                <div style={sidebarStyle} className="row">
                    <nav className="col-xl-2 d-none d-md-block bg-light sidebar border-right ml-3">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/dashboard">
                                        <span data-feather="home"></span>
                                        <b >Dashboard</b>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/account">
                                        <span dataFeather="file"></span>
                                        <b >Account</b>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/driveways">
                                        <span data-feather="shopping-cart"></span>
                                        <b >Driveways</b>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/add-driveway">
                                        <span data-feather="users"></span>
                                        <b >Add Driveway</b>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </nav>

                    
                </div>
            </div>
        )
    }
}

export default DashboardNav;