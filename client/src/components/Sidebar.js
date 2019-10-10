import React, { Component }  from "react";
import { Link, NavLink } from 'react-router-dom'
import { slide as Menu } from "react-burger-menu";
import store from 'store'
import { getFromStorage } from '../utils/storage'

class Sidebar extends Component {

 constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            error: '',
            loggedOut: false
        }

        this.logout = this.logout.bind(this);
    }

    // if token in local storage, set token state to token value
    UNSAFE_componentWillMount() {
        store.get('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    logout(event) {
        // event.preventDefault()
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('park_p2p');
        console.log("~~~~~~~~~" , obj.token)
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

    render() {
        const { logout } = this
        return (
            <Menu>
                <br />
                <h1>Menu</h1>
                <Link className="nav-link  menu-item" to="/dash">Profits </Link>
                <Link className="nav-link  menu-item" to="/dash">Account </Link>
                <Link className="nav-link  menu-item" to="/dash/driveway">Driveway</Link>
                <Link className="nav-link  menu-item" to="/dash/subscription">Subscription </Link>
                <Link className="nav-link  menu-item" to="/dash/cancel">Cancel Account</Link>
                <a className="nav-link  menu-item" href="/">Main Menu</a>
                <a className="nav-link  menu-item" onClick={logout} href="/login">Logout</a>
            </Menu>
        );
    }
};

export default Sidebar
