import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store';
import 'whatwg-fetch';
import ReservationCard from './ReservationCard'

class Reservations extends Component {
    constructor() {
        super();
        this.state = {
            reservations: [],
            token: ''
        };
    }


    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    // gets info based on token
    componentDidMount() {
        const { token, reservations } = this.state
        fetch('/api/reservations/' + token)
        .then(res => res.json())
        .then(reservations => {
            this.setState({
                reservations,
            })
        }, () => console.log("reservations array", reservations, "this users token", token))
    }   

    render() {
        let { reservations } = this.state
        const { token } = this.state

        if (!token) {
            return (
                <div>
                    <Redirect to='/' />
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row pb-2 pt-2 border-bottom text-center">
                    <div className="col-12">
                        <h4>My Reservations</h4>
                    </div>
                </div>
                <div className="row mt-3 d-flex justify-content-between text-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="card-deck mb-3 text-center d-flex justify-content-between">
                            {reservations.map((row, i) => 
                                <div key={i}>
                                    <ReservationCard
                                        number={i + 1}
                                        address={row.Address}
                                        city={row.City}
                                        state={row.State}
                                        zipcode={row.Zipcode}
                                        rate={row.Rate}
                                        stay_type={row.Stay_Type}
                                        fee={row.Fee}
                                        total={row.Total}
                                        start_time={row.Start_Time}
                                        end_time={row.End_Time}
                                        start_date={row.Start_Date}
                                        end_date={row.End_Date}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reservations