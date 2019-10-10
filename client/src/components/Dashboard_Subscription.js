import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store'
import 'whatwg-fetch';
import DashboardNav from './Dashboard_Nav_Top'
import SideBar from "./Sidebar";


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
        return (
            <div>
                {/* <Toolbar /> */}
                <DashboardNav />
                <SideBar />
                <div className="container-flex">
                    {/* <DashboardNavSide /> */}
                    
                        <div className="row pb-3 pt-3 border-bottom text-center">
                            <div className="col-xl-12">
                                <h4>Subscription Plans</h4>
                            </div>
                        </div>
                        <div className="container pl-3 pt-5">
                            <div className="card-deck mb-3 text-center">
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">Basic</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">$30 <small className="text-muted">/ mo</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>No parking fee</li>
                                            <li>Early Bird Reservations</li>
                                            <br />
                                        </ul>
                                        <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                                    </div>
                                </div>
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">Discount</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">$50 <small className="text-muted">/ mo</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>No parking fee</li>
                                            <li>15% off spot price</li>
                                            <li>Early Bird Reservations</li>
                                        </ul>
                                        <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                                    </div>
                                </div>
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-header">
                                        <h4 className="my-0 font-weight-normal">All Inclusive</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">$100 <small className="text-muted">/ mo</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>No parking fee</li>
                                            <li>No charge for spots</li>
                                            <li>Early Bird Reservations</li>
                                        </ul>
                                        <button type="button" className="btn btn-lg btn-block btn-primary">Contact us</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
        )


    }
}

export default Subscription