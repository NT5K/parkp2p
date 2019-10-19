import React, { Component } from 'react';
import store from 'store';
import 'whatwg-fetch';

const headerStyle = {
    // backgroundColor: '#3b4cc4',
    // zIndex: 1,
    boxShadow: '5px 5px 8px -2px gray'
}

class DashboardNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            token: ''
        };
    }

    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }
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

                        <div className="col-xl-8 no-gutter">
                        <h2 className=" text-white text-center text-light">{Email}</h2>
                        </div>
                        <div className="col-xl-2"></div>
                </nav>
            </div>
        )
    }
}

export default DashboardNav;