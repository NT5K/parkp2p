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
            displayState: '',
            displaySpots: '',
            hourlyToPostRequest: '',
            dailyToPostRequest: '',
            weeklyToPostRequest: '',
            monthlyToPostRequest: '',
            overnightToPostRequest: '',
            descriptionToPostRequest: '',
            stateToPostRequest: '',
            spotsToPostRequest: '',
            complete: ''
 
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
        this.onTextboxChangeSpots = this.onTextboxChangeSpots.bind(this);
        this.updateSpots = this.updateSpots.bind(this);
        this.updateStateTrueOrFalse = this.updateStateTrueOrFalse.bind(this);
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
                const { Daily, Weekly, Hourly, Monthly, Overnight, Description, Active_State, Spots } = user[0]
                console.log(Active_State)
                console.log(user[0].Daily)
                console.log(this.state.user)
                let ActiveState = ''
                if (Active_State === 0) {
                    ActiveState = "De-activated"
                } 
                if (Active_State === 1) {
                    ActiveState = "Activated"
                }
                this.setState({
                    user: user[0],
                    displayDaily: Daily,
                    displayHourly: Hourly,
                    displayWeekly: Weekly,
                    displayMonthly: Monthly,
                    displayOvernight: Overnight,
                    displayDescription: Description,
                    displayState: ActiveState,
                    displaySpots: Spots
                    
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
                if (json.success) {
                    this.setState({
                        displayHourly: hourlyToPostRequest
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
                if (json.success) {
                    this.setState({
                        displayDaily: dailyToPostRequest
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
                if (json.success) {
                    this.setState({
                        displayWeekly: weeklyToPostRequest
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
                if (json.success) {
                    this.setState({
                        displayMonthly: monthlyToPostRequest
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
                if (json.success) {
                    this.setState({
                        displayOvernight: overnightToPostRequest
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
                if (json.success) {
                    this.setState({
                        displayDescription: descriptionToPostRequest
                    });
                }
            });
    }

    updateStateTrueOrFalse(event) {
        event.preventDefault()
        const inputState= event.target.value
        // Grab state
        const { token } = this.state;
        // post to backend
        fetch('/api/account/update/active', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                inputState
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success && json.new_active_state === 1) {
                this.setState({
                    displayState: "Activated"
                });
            }
            if (json.success && json.new_active_state === 0) {
                this.setState({
                    displayState: "De-activated"
                });
            }
        });
    }

    onTextboxChangeSpots(event) {
        this.setState({
            spotsToPostRequest: event.target.value
        });

     }

     updateSpots(event) {
         event.preventDefault()
         // Grab spots
         const { spotsToPostRequest, token } = this.state;
         // post to backend
         console.log(spotsToPostRequest, "what is going into the post request")
         fetch('/api/account/update/spots', {
             method: 'post',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 token,
                 spotsToPostRequest
             })
         })
         .then(res => res.json())
         .then(json => {
                 if (json.success) {
                     this.setState({
                         displaySpots: spotsToPostRequest
                     });
                 }
             });
        }

    render() {
        const {
            displayHourly, 
            displayDaily, 
            displayWeekly, 
            displayMonthly, 
            displayOvernight,
            displayDescription,
            displayState,
            displaySpots,
            token, 
            // complete
        } = this.state
        const { 
            hourlyToPostRequest, 
            dailyToPostRequest, 
            weeklyToPostRequest,
            monthlyToPostRequest, 
            overnightToPostRequest, 
            descriptionToPostRequest,
            spotsToPostRequest
            // stateToPostRequest 
        } = this.state
        const { 
            updateHourly, 
            updateDaily, 
            updateWeekly, 
            updateMonthly, 
            updateOvernight, 
            updateDescription, 
            updateStateTrueOrFalse, 
            updateSpots
        } = this
        const { 
            onTextboxChangeHourly, 
            onTextboxChangeDaily, 
            onTextboxChangeWeekly, 
            onTextboxChangeMonthly, 
            onTextboxChangeOvernight, 
            onTextboxChangeDescription, 
            onTextboxChangeSpots
        } = this

        if (!token) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }

        return (
            <div>
                <div className="container-flex">
                    <div className="row pb-3 pt-3 border-bottom text-center">
                        <div className="col-xl-12">
                            <h4>Edit Driveway Information</h4>
                        </div>
                    </div>

                    <div className="row mt-3 text-dark text-center">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>Driveway Active State</b></u></h5>
                            <p>(when set to active, your driveway will be available to the public)</p>
                        </div>
                    </div>

                    {/* active state of driveway, active or de-active buttons */}
                    <div className="row mt-2 text-dark text-center justify-content-center">
                        <div className="col-sm-2 col-xs-6">
                            <h6 className="border-right">Driveway State</h6>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            {displayState}
                        </div>

                        <form id="state_change" method="POST" action='/api/account/update/active'></form>

                        <div className="col-sm-2 col-xs-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-block btn-primary"
                                value="1"
                                form="state_change"
                                onClick={updateStateTrueOrFalse}
                            >
                                Activate
                            </button>
                        </div>
                        <div className="col-sm-2 col-xs-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-block btn-primary"
                                value="0"
                                form="state_change"
                                onClick={updateStateTrueOrFalse}
                            >
                                De-activate
                            </button>
                        </div>
                    </div>


                    <div className="row mt-3 text-dark text-center">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>Driveway Rates</b></u></h5>
                            <p>(set rates based on time, additional fees can be found <a href="/rates">here</a>)</p>
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
                    header={"Spots"}
                    displayText={displaySpots}
                    id={"update_Spots"}
                    action={"/api/account/update/spots"}
                    type={"number"}
                    inputId={"spots"}
                    value={spotsToPostRequest}
                    onChange={onTextboxChangeSpots}
                    placeholder={"number of spots"}
                    onClick={updateSpots}
                    buttonText={"submit"}
                    />

                    <div className="row mt-3 text-dark text-center">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>Driveway Description</b></u></h5>
                                example:<br /> 
                                <div className="row pl-5 pr-5">
                                    <div className="col-sm-12">
                                            "Our driveway is right next to the local high school. Street parking is 
                                            virtually nonexistent for friday night football games. A 2 minute walk to work
                                             in the local downtown area. Great daily rates!"
                                    </div>
                                </div>
                        </div>
                    </div>

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