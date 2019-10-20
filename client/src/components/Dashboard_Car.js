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
            carModelToPostRequest: '',
            displayCarModel: '',
            carYearToPostRequest: '',
            displayCarYear: '',
            displayCarColor: '',
            carColorToPostRequest: '',
            displayFullCar: ''
        };

        this.updateCarMake = this.updateCarMake.bind(this);
        this.onTextboxCarMake = this.onTextboxCarMake.bind(this);
        this.updateCarModel = this.updateCarModel.bind(this);
        this.onTextboxCarModel = this.onTextboxCarModel.bind(this);
        this.updateCarColor = this.updateCarColor.bind(this);
        this.onTextboxCarColor = this.onTextboxCarColor.bind(this);
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
            const { Car_Make, Car_Model, Car_Year, Car_Color } = user[0]
            console.log(user)
            this.setState({
                user: user[0],
                displayCarMake: Car_Make,
                displayCarModel: Car_Model,
                displayCarYear: Car_Year,
                displayCarColor: Car_Color,
                displayFullCar: Car_Color + " " + Car_Make + " " + Car_Model
                
            })
        // }, () => console.log("user array", user, "this users token", token))
        }, () => console.log('success'))
    }

    updateCarMake(event) {
        event.preventDefault()
        // Grab state
        const { carMakeToPostRequest, token, displayCarModel } = this.state;
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
                    displayCarMake: carMakeToPostRequest,
                    displayFullCar: carMakeToPostRequest + " " + displayCarModel
                });
            }
        });
    }

    updateCarModel(event) {
        event.preventDefault()
        // Grab state
        const { carModelToPostRequest, token, displayCarMake } = this.state;
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
                    displayCarModel: carModelToPostRequest,
                    displayFullCar: displayCarMake + " " + carModelToPostRequest
                });
            }
        });
    }
    
    updateCarColor(event) {
        event.preventDefault()
        // Grab state
        const { carColorToPostRequest, token, displayCarMake, displayCarModel } = this.state;
        // post to backend
        fetch('/api/account/update/car/color', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                carColorToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
                this.setState({
                    displayCarColor: carColorToPostRequest,
                    displayFullCar: carColorToPostRequest + " " + displayCarMake + " " + displayCarModel
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
    onTextboxCarColor(event) {
        this.setState({
            carColorToPostRequest: event.target.value
        });
    }

    render() {
        const { 
            displayCarMake, 
            carMakeToPostRequest, 
            carModelToPostRequest, 
            displayCarModel, 
            displayFullCar, 
            carColorToPostRequest,
            displayCarColor,
            token 
        } = this.state
        const { 
            updateCarMake, 
            onTextboxCarMake, 
            onTextboxCarModel, 
            updateCarModel,
            onTextboxCarColor,
            updateCarColor
        } = this

        if (!token) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }

        return (
            <div className="container-flex">
                <div className="row pb-3 pt-3 border-bottom text-center">
                    <div className="col-xl-12">
                        <h4>View / Edit Car Information</h4>
                    </div>
                </div>
                <div className="row mt-3 text-dark text-center">
                    <div className="col-sm-12">
                        <h5 className="text-center"><u><b>Car Information</b></u></h5>
                        <p>(So the owner of the driveway knows what kind of car is parked)</p>
                        <p><b>Your Car: {displayFullCar}</b></p>
                    </div>
                </div>
                <br />
                <div className="row mt-3 text-dark text-center">
                    <div className="col-sm-12">
                        <h5 className="text-center"><u><b>Edit Car</b></u></h5>
                    </div>
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
                    <PersonalInfoRow
                        header="Car Color"
                        displayText={displayCarColor}
                        id={"update_car_Color"}
                        action={"/api/account/update/car/color"}
                        type={"text"}
                        inputId={"carColor"}
                        value={carColorToPostRequest}
                        onChange={onTextboxCarColor}
                        placeholder={"Car Color Input"}
                        onClick={updateCarColor}
                        buttonText={"Submit"}
                    />
                </div>
            </div>
        )
    }
}

export default Car
