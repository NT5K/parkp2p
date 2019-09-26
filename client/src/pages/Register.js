import React, { Component } from 'react';

import Register from './../components/Register/Register'
import RegisterTwo from './../components/Register2/Register2'
import LoginNav from './../components/LoginNav/LoginNav'

class RegisterPage extends Component {
   
    render() {
        return (
            <div>
                <LoginNav/>
                <RegisterTwo />
            </div>
        );
    }
}

export default RegisterPage;