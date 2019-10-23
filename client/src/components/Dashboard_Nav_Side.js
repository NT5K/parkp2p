import React, { Component } from 'react';

class DashboardNavSide extends Component {
    render() {
        return (
            <nav className="col-xl-2 col-md-12 d-none d-md-block bg-light sidebar border border-right pt-3">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard">Profits </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/account">Account Info </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Driveway Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Driveway Reservations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/account-subscription">My Subscription </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/account-cancel">Cancel Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/">Back to Map</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default DashboardNavSide;