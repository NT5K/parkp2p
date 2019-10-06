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
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/account">Account </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/add-driveway">Driveway</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Subscription </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Cancel Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Main Menu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/driveways">Logout </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default DashboardNavSide;