import React, { Component }  from "react";
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
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

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

    render() {
        const { logout } = this
        return (
            <Menu>
                <br />
                <a className="nav-link  menu-item" href="/dash">Profits </a>
                <a className="nav-link  menu-item" href="/dash">Account </a>
                <a className="nav-link  menu-item" href="/dash/driveways">Driveway</a>
                <a className="nav-link  menu-item" href="/dash/account-subscription">Subscription </a>
                <a className="nav-link  menu-item" href="/dash/account-cancel">Cancel Account</a>
                <a className="nav-link  menu-item" href="/">Main Menu</a>
                <a className="nav-link  menu-item" onClick={logout} href="/login">Logout</a>
            </Menu>
        );
    }
};

export default Sidebar
