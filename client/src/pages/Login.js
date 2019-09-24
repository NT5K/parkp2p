import React, { Component } from 'react';
import Login from './../components/Login/Login'
import LoginNav from './../components/LoginNav/LoginNav'

class LoginPage extends Component {
    render() {
        return (
            <div>
                <LoginNav />
                <Login />
            </div>
        );
    }
}

export default LoginPage;