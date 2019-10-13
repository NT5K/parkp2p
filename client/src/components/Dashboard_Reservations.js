import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store';
import 'whatwg-fetch';
import PersonalInfoRow from './PersonalInfoRow'

class Profits extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
        };
    }
}

// set token state to token value
UNSAFE_componentWillMount() {
    localStorage.getItem('park_p2p') && this.setState({
        token: store.get('park_p2p').token
    })
}

// gets info based on token
componentDidMount() {
    const { token, user } = this.state
    fetch('/api/account/personal/' + token)
        .then(res => res.json())
        .then(user => {
            const { Name, Email, Phone_Number, Address, City, Zipcode, State } = user[0]
            this.setState({
                user: user[0],
                displayFullName: Name,
                displayEmail: Email,
                displayPhoneNumber: Phone_Number,
                displayFullAddress: Address + ", " + City + ", " + State + " " + Zipcode,
                displayAddress: Address,
                displayCity: City,
                displayState: State,
                displayZipcode: Zipcode
            })
        }, () => console.log("user array", user, "this users token", token))
}

render() {
    const {
        token,
      
    } = this.state

    const {
      
    } = this

    if (!token) {
        return (
            <div>
                <Redirect to='/' />
            </div>
        )
    }

    return (
        <div>

        </div>
    );
}

export default Profits