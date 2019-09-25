import React, { Component } from 'react';

import Register from './../components/Register/Register'
import LoginNav from './../components/LoginNav/LoginNav'

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        fetch('/user/register') // or whatever URL you want
            .then((response) => response.json())
            .then((posts) => this.setState({
                posts: posts,
            }));
    }

    render() {
        return (
            <div>
                <LoginNav/>
                <Register posts={this.state.posts} />
            </div>
        );
    }
}

export default RegisterPage;