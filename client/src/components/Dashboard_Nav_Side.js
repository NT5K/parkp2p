import React, { Component } from 'react';



    logout() {
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('park_p2p');
        // console.log("~~~~~~~~~" , obj.token)
        if (obj && obj.token) {
            const { token } = obj;
            console.log("TOKEN", token)
            this.setState({ error: "good1" })

            // Delete token from database, clear local storage
            fetch('/api/account/logout/' + token, {
                method: 'DELETE',
                body: JSON.stringify(token)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        store.remove('park_p2p')
                        this.setState({
                            token: '',
                            isLoading: false,
                            error: "successful logout",
                            loggedOut: true
                        });

                    } else {
                        this.setState({
                            isLoading: false,
                            error: "failed to logout"
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    
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
                            <a className="nav-link text-dark font-weight-bold" href="/dashboard/account-cancel">Cancel Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark font-weight-bold" href="/">Main Menu</a>
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