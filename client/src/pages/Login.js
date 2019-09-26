import React, { Component } from 'react';
import Login from './../components/Login/Login'
import LoginTwo from './../components/Login2/Login2'
import LoginNav from './../components/LoginNav/LoginNav'

class LoginPage extends Component {
    render() {
        return (
            <div>
                <LoginNav />
                <LoginTwo />
            </div>
        );
    }
}

export default LoginPage;