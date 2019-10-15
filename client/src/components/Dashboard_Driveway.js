import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store'
import 'whatwg-fetch';
import PersonalInfoRow from './PersonalInfoRow'




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
            displayDescription: '',
            hourlyToPostRequest: '',
            dailyToPostRequest: '',
            weeklyToPostRequest: '',
            monthlyToPostRequest: '',
            overnightToPostRequest: '',
            descriptionToPostRequest: ''
 
        }

        this.onTextboxChangeHourly = this.onTextboxChangeHourly.bind(this);
        this.updateHourly = this.updateHourly.bind(this);
        this.onTextboxChangeDaily = this.onTextboxChangeDaily.bind(this);
        this.updateDaily = this.updateDaily.bind(this);
        this.onTextboxChangeWeekly = this.onTextboxChangeWeekly.bind(this);
        this.updateWeekly = this.updateWeekly.bind(this);
        this.onTextboxChangeMonthly = this.onTextboxChangeMonthly.bind(this);
        this.updateMonthly = this.updateMonthly.bind(this);
        this.onTextboxChangeOvernight = this.onTextboxChangeOvernight.bind(this);
        this.updateOvernight = this.updateOvernight.bind(this);
        this.onTextboxChangeDescription = this.onTextboxChangeDescription.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
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
                const { Daily, Weekly, Hourly, Monthly, Overnight, Description } = user[0]
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
                    displayDescription: Description
                })
            }, () => console.log("user array", this.state.user, "this users token", this.state.token))
    }

    // passes input values to state
    onTextboxChangeHourly(event) {
        this.setState({
            hourlyToPostRequest: event.target.value
        });
    }

    updateHourly(event) {
        event.preventDefault()
        // Grab state
        const { hourlyToPostRequest, token } = this.state;
        // post to backend
        console.log(hourlyToPostRequest)
        fetch('/api/account/update/rates/hourly', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                hourlyToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
                // set state for display
                // const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                if (json.success) {
                    this.setState({
                        displayHourly: hourlyToPostRequest
                        // displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                    });
                }
            });
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

    onTextboxChangeWeekly(event) {
        this.setState({
            weeklyToPostRequest: event.target.value
        });
    }

    updateWeekly(event) {
        event.preventDefault()
        // Grab state
        const { weeklyToPostRequest, token } = this.state;
        // post to backend
        console.log(weeklyToPostRequest)
        fetch('/api/account/update/rates/weekly', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                weeklyToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
                // set state for display
                // const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                if (json.success) {
                    this.setState({
                        displayWeekly: weeklyToPostRequest
                        // displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                    });
                }
            });
    }

    onTextboxChangeMonthly(event) {
        this.setState({
            monthlyToPostRequest: event.target.value
        });
    }

    updateMonthly(event) {
        event.preventDefault()
        // Grab state
        const { monthlyToPostRequest, token } = this.state;
        // post to backend
        console.log(monthlyToPostRequest)
        fetch('/api/account/update/rates/monthly', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                monthlyToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
                // set state for display
                // const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                if (json.success) {
                    this.setState({
                        displayMonthly: monthlyToPostRequest
                        // displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                    });
                }
            });
    }

    onTextboxChangeOvernight(event) {
        this.setState({
            overnightToPostRequest: event.target.value
        });
    }

    updateOvernight(event) {
        event.preventDefault()
        // Grab state
        const { overnightToPostRequest, token } = this.state;
        // post to backend
        console.log(overnightToPostRequest)
        fetch('/api/account/update/rates/overnight', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                overnightToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
                // set state for display
                // const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                if (json.success) {
                    this.setState({
                        displayOvernight: overnightToPostRequest
                        // displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                    });
                }
            });
    }

    onTextboxChangeDescription(event) {
        this.setState({
            descriptionToPostRequest: event.target.value
        });
    }

    updateDescription(event) {
        event.preventDefault()
        // Grab state
        const { descriptionToPostRequest, token } = this.state;
        // post to backend
        console.log(descriptionToPostRequest)
        fetch('/api/account/update/description', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                descriptionToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
                // set state for display
                // const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                if (json.success) {
                    this.setState({
                        displayDescription: descriptionToPostRequest
                        // displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                    });
                }
            });
    }

    render() {
        const { displayHourly, displayDaily, displayWeekly, displayMonthly, displayOvernight,displayDescription, token} = this.state
        const { hourlyToPostRequest, dailyToPostRequest, weeklyToPostRequest, monthlyToPostRequest, overnightToPostRequest, descriptionToPostRequest } = this.state
        const { updateHourly, updateDaily, updateWeekly, updateMonthly, updateOvernight, updateDescription } = this
        const { onTextboxChangeHourly, onTextboxChangeDaily, onTextboxChangeWeekly, onTextboxChangeMonthly, onTextboxChangeOvernight, onTextboxChangeDescription} = this
        
        console.log(displayDaily,"HERE!!!");

        if (!token) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }

        return (
            <div>
                {/* <DashboardNav />
                <SideBar /> */}
                <div className="container-flex">
                    <div className="row pb-3 pt-3 border-bottom text-center">
                        <div className="col-xl-12">
                            <h4>Set Driveway Rates</h4>
                        </div>
                    </div>

                        
                        <PersonalInfoRow
                            header={"Hourly"}
                            displayText={'$' + displayHourly}
                            id={"update_Hourly"}
                            action={"/api/account/update/rates/hourly"}
                            type={"number"}
                            inputId={"hourly"}
                            value={hourlyToPostRequest}
                            onChange={onTextboxChangeHourly}
                            placeholder={"hourly"}
                            onClick={updateHourly}
                            buttonText={"submit"}
                        />
                       <PersonalInfoRow
                            header={"Daily"}
                            displayText={'$'+displayDaily}
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
                        <PersonalInfoRow
                            header={"Weekly"}
                            displayText={'$'+displayWeekly}
                            id={"update_Weekly"}
                            action={"/api/account/update/rates/weekly"}
                            type={"number"}
                            inputId={"weekly"}
                            value={weeklyToPostRequest}
                            onChange={onTextboxChangeWeekly}
                            placeholder={"weekly"}
                            onClick={updateWeekly}
                            buttonText={"submit"}
                        />
                        <PersonalInfoRow
                            header={"Monthly"}
                            displayText={'$'+displayMonthly}
                            id={"update_Monthly"}
                            action={"/api/account/update/rates/monthly"}
                            type={"number"}
                            inputId={"monthly"}
                            value={monthlyToPostRequest}
                            onChange={onTextboxChangeMonthly}
                            placeholder={"monthly"}
                            onClick={updateMonthly}
                            buttonText={"submit"}
                        />
                        <PersonalInfoRow
                            header={"Overnight"}
                            displayText={'$'+displayOvernight}
                            id={"update_Overnight"}
                            action={"/api/account/update/rates/overnight"}
                            type={"number"}
                            inputId={"overnight"}
                            value={overnightToPostRequest}
                            onChange={onTextboxChangeOvernight}
                            placeholder={"overnight"}
                            onClick={updateOvernight}
                            buttonText={"submit"}
                        />
                        <PersonalInfoRow
                            header={"Description"}
                            displayText={displayDescription}
                            id={"update_Description"}
                            action={"/api/account/update/description"}
                            type={"text"}
                            inputId={"description"}
                            value={descriptionToPostRequest}
                            onChange={onTextboxChangeDescription}
                            placeholder={"description"}
                            onClick={updateDescription}
                            buttonText={"submit"}
                        />
                </div>
            </div>
        )

                
    }
}

export default Dashboard