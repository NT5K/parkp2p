import React, { Component } from 'react';
import store from 'store';
import 'whatwg-fetch';

const headerStyle = {
    // backgroundColor: '#3b4cc4',
    // zIndex: 1,
    boxShadow: '5px 5px 8px -2px gray',
    height: "60px",
    width: '100vw'
}

class DashboardNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            token: ''
        };
    }

    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    // gets email based on token to display on right of nav
      componentDidMount() {
    fetch('/api/account/personal/email/' + this.state.token)
      .then(res => res.json())
      .then(email => this.setState({ Email: email[0].Email }))
    // .then(() => console.log("email", this.state.Email))
    }

    render() {
        const { Email } = this.state
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-dark" style={headerStyle}>
                    <div className="col-xl-2 border-right"></div>
                    <div className="col-xl-10 no-gutter">
                        <h6 className=" text-white text-right text-light">{Email}</h6>
                    </div>
                </nav>
            </div>
        )
    }
}

export default DashboardNav;