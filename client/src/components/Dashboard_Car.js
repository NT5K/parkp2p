import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
// import PersonalInfoRow from './PersonalInfoRow'
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
            carMakeToPostRequest: '',
            displayCarMake: '',

            Car_Model: '',
            carModelToPostRequest: '',
            displayCarModel: '',

            Car_Year: '',
            carYearToPostRequest: '',
            displayCarYear: '',
        };

        this.updateCarMake = this.updateCarMake.bind(this);
        this.onTextboxCarMake = this.onTextboxCarMake.bind(this);

        this.updateCarModel = this.updateCarModel.bind(this);
        this.onTextboxCarModel = this.onTextboxCarModel.bind(this);
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
                displayCarMake: Car_Make,
                displayCarModel: Car_Model,
                displayCarYear: Car_Year
                
            })
        }, () => console.log("user array", user, "this users token", token))
}


    updateCarMake(event) {
        event.preventDefault()
        // Grab state
        const { carMakeToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/car/make', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                carMakeToPostRequest
            })
        })
            .then(res => res.json())
            .then(json => {
                // set state for display
                if (json.success) {
                    this.setState({
                        displayCarMake: carMakeToPostRequest
                    });
                }
            });
    }
    updateCarModel(event) {
        event.preventDefault()
        // Grab state
        const { carModelToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/car/model', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                carModelToPostRequest
            })
        })
            .then(res => res.json())
            .then(json => {
                // set state for display
                if (json.success) {
                    this.setState({
                        displayCarModel: carModelToPostRequest
                    });
                }
            });
    }

    onTextboxCarMake(event) {
        this.setState({
            carMakeToPostRequest: event.target.value
        });
    }
    onTextboxCarModel(event) {
        this.setState({
            carModelToPostRequest: event.target.value
        });
    }

render() {
    const { Car_Make, Car_Model, Car_Year } = this.state
    const { displayCarMake, carMakeToPostRequest, carModelToPostRequest, displayCarModel } = this.state
    const { updateCarMake, onTextboxCarMake, onTextboxCarModel, updateCarModel } = this
    return (
        <div>

            <div>
                <div>{Car_Make}</div>
                <div>{Car_Model}</div>
                <div>{Car_Year}</div>
            </div>

            <div>

                <PersonalInfoRow
                    header="Car Make"
                    displayText={displayCarMake}
                    id={"update_car_make"}
                    action={"/api/account/update/car/make"}
                    type={"text"}
                    inputId={"carMake"}
                    value={carMakeToPostRequest}
                    onChange={onTextboxCarMake}
                    placeholder={"Car Make Input"}
                    onClick={updateCarMake}
                    buttonText={"Submit"}
                />

                <PersonalInfoRow
                    header="Car Model"
                    displayText={displayCarModel}
                    id={"update_car_model"}
                    action={"/api/account/update/car/model"}
                    type={"text"}
                    inputId={"carModel"}
                    value={carModelToPostRequest}
                    onChange={onTextboxCarModel}
                    placeholder={"Car Model Input"}
                    onClick={updateCarModel}
                    buttonText={"Submit"}
                />


            </div>
        </div>
    )
}

}
export default Car
