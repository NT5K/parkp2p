import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store'
import 'whatwg-fetch';
import DashboardNav from './Dashboard_Nav_Top'
import PersonalInfoRow from './PersonalInfoRow'
import SideBar from "./Sidebar";



class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
            displayDaily: '',
            displayHourly: '',
            displayWeekly: '',
            displayMonthly: '',
            displayOvernight: '',

            dailyToPostRequest: '',
            displayDaily: ''

        }

        this.onTextboxChangeDaily = this.onTextboxChangeDaily.bind(this);
        this.updateDaily = this.updateDaily.bind(this);
    }


    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    // gets info based on token
    componentDidMount() {
        fetch('/api/account/rates/' + this.state.token)
            .then(res => res.json())
            .then(user => {
                const { Daily, Weekly, Hourly, Monthly, Overnight } = user[0]
                console.log(this.state.token)
                console.log(user[0].Daily)
                console.log(this.state.user)
                this.setState({
                    user: user[0],
                    displayDaily: Daily,
                    displayHourly: Hourly,
                    displayWeekly: Weekly,
                    displayMonthly: Monthly,
                    displayOvernight: Overnight,
                })
            }, () => console.log("user array", this.state.user, "this users token", this.state.token))
    }

    // passes input values to state
    onTextboxChangeDaily(event) {
        this.setState({
            dailyToPostRequest: event.target.value
        });
    }

    updateDaily(event) {
        event.preventDefault()
        // Grab state
        const { dailyToPostRequest, token } = this.state;
        // post to backend
        console.log(dailyToPostRequest)
        fetch('/api/account/update/rates/daily', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                dailyToPostRequest
            })
        })
            .then(res => res.json())
            .then(json => {
                // set state for display
                // const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                if (json.success) {
                    this.setState({
                        displayDaily: dailyToPostRequest
                        // displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                    });
                }
            });
    }

    render() {
        const { displayDaily, dailyToPostRequest } = this.state
        const { onTextboxChangeDaily, updateDaily } = this
        return (
            <div>
                <DashboardNav />
                <SideBar />
                <div className="container-flex">
                    <div className="row pb-3 pt-3 border-bottom text-center">
                        <div className="col-xl-12">
                            <h4>View / Edit Driveway Information</h4>
                        </div>
                    </div>
                    <div className="row mt-3 text-dark text-center">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>Driveway Information:</b></u></h5>
                        </div>
                    </div>
                    <PersonalInfoRow
                        header={"Daily"}
                        displayText={displayDaily}
                        id={"update_Daily"}
                        action={"/api/account/update/rates/daily"}
                        type={"number"}
                        inputId={"daily"}
                        value={dailyToPostRequest}
                        onChange={onTextboxChangeDaily}
                        placeholder={"daily"}
                        onClick={updateDaily}
                        buttonText={"submit"}
                    />
                </div>
            </div>
        )

                
    }
}

export default Dashboard