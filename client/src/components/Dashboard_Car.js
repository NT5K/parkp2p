import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store'
import 'whatwg-fetch';
import PersonalInfoRow from './PersonalInfoRow'
// const carQuery = new CarQuery();

class Car extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
            Car_Make: '',
            Car_Model: '',
            Car_Year: ''
        };
    }


UNSAFE_componentWillMount() {
    localStorage.getItem('park_p2p') && this.setState({
        token: store.get('park_p2p').token
    })
}

componentDidMount() {
    const { token, user } = this.state
    fetch('/api/account/personal/car/' + token)
        .then(res => res.json())
        .then(user => {
            const { Car_Make, Car_Model, Car_Year } = user[0]
            console.log(user)
            this.setState({
                user: user[0],
                Car_Make,
                Car_Model,
                Car_Year
                
            })
        }, () => console.log("user array", user, "this users token", token))
}


render() {
    const { Car_Make, Car_Model, Car_Year } = this.state
    return (
        <div>
            <div>{Car_Make}</div>
            <div>{Car_Model}</div>
            <div>{Car_Year}</div>

            <div></div>




        </div>
    )
}

}
export default Car
