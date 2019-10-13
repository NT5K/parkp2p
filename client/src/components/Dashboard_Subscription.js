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

    render() {
        const { token } = this.state

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
                    <div className="container pl-3 pt-5">
                        <div className="card-deck mb-3 text-center">
                            <SubscriptionPlanCard
                                header={"Basic"}
                                price={"30"}
                                info1={"No parking fee"}
                                info2={"Early Bird Reservations"}
                                info3={<br />}
                            />
                            <SubscriptionPlanCard
                                header={"Discount"}
                                price={"50"}
                                info1={"No parking fee"}
                                info2={"15% off spot price"}
                                info3={"Early Bird Reservations"}
                            />
                            <SubscriptionPlanCard
                                header={"All Inclusive"}
                                price={"100"}
                                info1={"No parking fee"}
                                info2={"No charge for spots"}
                                info3={"Early Bird Reservations"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Subscription