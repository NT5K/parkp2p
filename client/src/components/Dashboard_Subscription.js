import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import SubscriptionPlanCard from './SubscriptionPlanCard'
import store from 'store'
import 'whatwg-fetch';

class Subscription extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
            displaySubscription: '',
            subscriptionNumberToPostRequest: '',

            displayInfoRow1: '',
            displayInfoRow2: '',
            displayInfoRow3: '',
            displayInfoRow4: ''
        }

        this.updateSubscription = this.updateSubscription.bind(this);
        // this.onClickSetNumberForPostRequest = this.onClickSetNumberForPostRequest.bind(this);

    }

    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    // gets info based on token
    componentDidMount() {
        fetch('/api/account/subscription/plan/' + this.state.token)
            .then(res => res.json())
            .then(user => {
                const { Subscription } = user[0]
                // console.log(this.state.token)
                // console.log(this.state.user)
                if (Subscription === 1) {
                    this.setState({
                        user: user[0],
                        displaySubscription: Subscription,
                        displayInfoRow1: "Price: $30/mo",
                        displayInfoRow2: "No parking fees",
                        displayInfoRow3: "Early Bird Reservations"
                    })
                }
                else if (Subscription < 3 && Subscription > 1) {
                    this.setState({
                        user: user[0],
                        displaySubscription: Subscription,
                        displayInfoRow1: "Price: $60/mo",
                        displayInfoRow2: "No parking fees",
                        displayInfoRow3: "15% off spot price",
                        displayInfoRow4: "Early Bird Reservations"
                    })
                }
                else if (Subscription > 2) {
                    this.setState({
                        user: user[0],
                        displaySubscription: Subscription,
                        displayInfoRow1: "Price: $120/mo",
                        displayInfoRow2: "No parking fees",
                        displayInfoRow3: "No charge for spots",
                        displayInfoRow4: "Early Bird Reservations"
                    })
                } 
                else if (Subscription < 1) {
                    this.setState({
                        user: user[0], 
                        displaySubscription: Subscription,
                        displayInfoRow1: "No Subscription",
                        
                    })
                }
            }, () => console.log("user array", this.state.user, "this users token", this.state.token))
    }

    onClickSetNumberForPostRequest(event) {
        this.setState({
            subscriptionNumberToPostRequest: event.target.value
        });
    }

    updateSubscription(event) {
        event.preventDefault()
        const inputSubscription= event.target.value
        // Grab state
        const { token } = this.state;
        // post to backend
        fetch('/api/account/subscription/plan/update', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                inputSubscription
            })
        })
            .then(res => res.json())
            .then(json => {
                // set state for display
                if (json.success && json.subscription < 2) {
                    this.setState({
                        displaySubscription: inputSubscription,
                        displayInfoRow1: "Price: $30/mo",
                        displayInfoRow2: "No parking fees",
                        displayInfoRow3: "Early Bird Reservations",
                        displayInfoRow4: ""
                    });
                }
                if (json.success && json.subscription > 1 && json.subscription < 3) {
                    this.setState({
                        displaySubscription: inputSubscription,
                        displayInfoRow1: "Price: $60/mo",
                        displayInfoRow2: "No parking fees",
                        displayInfoRow3: "15% off spot price",
                        displayInfoRow4: "Early Bird Reservations"
                    });
                }
                if (json.success && json.subscription > 2) {
                    this.setState({
                        displaySubscription: inputSubscription,
                        displayInfoRow1: "Price: $120/mo",
                        displayInfoRow2: "No parking fees",
                        displayInfoRow3: "No charge for spots",
                        displayInfoRow4: "Early Bird Reservations"
                    });
                }
            });
    }

    render() {
        const { 
            token, 
            // displaySubscription, 
            // displayInfo, 
            displayInfoRow1,
            displayInfoRow2,
            displayInfoRow3, 
            displayInfoRow4 
        } = this.state
        const { updateSubscription /*onClickSetNumberForPostRequest*/ } = this

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
                            <h4>Subscription Plans</h4>
                        </div>
                    </div>
                    <div className="row mt-3 text-dark text-center p-3">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>My Current Plan</b></u></h5>
                            {/* <p>(personal information only you can see)</p> */}
                            {/* {displaySubscription} */}
                            {/* <br /> */}
                            {displayInfoRow1}
                            <br />
                            {displayInfoRow2}
                            <br />
                            {displayInfoRow3}
                            <br />
                            {displayInfoRow4}

                        </div>
                    </div>
                    <hr />
                    <div className="container pl-3 pt-3">
                        <div className="card-deck mb-3 text-center">
                            <SubscriptionPlanCard
                                plan={"Basic"}
                                price={"30"}
                                info1={"No parking fees"}
                                info2={"Early Bird Reservations"}
                                info3={<br />}
                                value={1}
                                onClick={updateSubscription}
                                // onChange={onClickSetNumberForPostRequest}
                            />
                            <SubscriptionPlanCard
                                plan={"Discount"}
                                price={"50"}
                                info1={"No parking fees"}
                                info2={"15% off spot price"}
                                info3={"Early Bird Reservations"}
                                value={2}
                                onClick={updateSubscription}
                                // onChange={onClickSetNumberForPostRequest}
                            />
                            <SubscriptionPlanCard
                                plan={"All Inclusive"}
                                price={"100"}
                                info1={"No parking fees"}
                                info2={"No charge for spots"}
                                info3={"Early Bird Reservations"}
                                value={3}
                                onClick={updateSubscription}
                                // onChange={onClickSetNumberForPostRequest}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Subscription