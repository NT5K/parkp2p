import React, { Component } from 'react';

import Register from './../components/Register/Register'
import LoginNav from './../components/LoginNav/LoginNav'

class RegisterPage extends Component {
    render() {
        return (
            <div>
                <LoginNav />
                <Register />
            </div>
        );
    }
}

export default RegisterPage;