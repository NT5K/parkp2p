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
        const { token , reservations } = this.state
        fetch('/api/reservations/' + token)
        .then(res => res.json())
        .then(reservations => {
            this.setState({
                reservations
            })
        // }, () => console.log("reservations array", reservations, "this users token", token))
        }, () => console.log("success"))
    }   

    render() {
        let { reservations } = this.state
        const { token } = this.state
        console.log(reservations)
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

                            {/* <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            <h4 className="">Reservation #</h4>
                                        </div>
                                        <div className="col-2">
                                            <p role="button" onClick={() => deleteRes(id)}> x </p>
                                            <p role="button"> x </p>
                                            <Modal open={open} onClose={this.onCloseModal} center>
                                                <h2 className="mt-5">Delete this reservation?</h2>
                                                <button className="btn btn-lg w-100 btn-block btn-primary" onClick={() => deleteRes(id)}> Yes </button>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title pricing-card-title">Create a Reservation</h5>
                                    <h6 className="card-title pricing-card-title">on the form below the map</h6>
                                    <hr />
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Rate: $1.25/Hour</li>
                                        <li>Fee: $.25/Hour</li>
                                        <li>Total: $1.50/Hour</li>
                                    </ul>
                                    <hr />
                                    <h6>Estimated Dates</h6>
                                    <h5>10-22-2019 - 10-22-2019</h5>
                                    <h6>Estimated Times</h6>
                                    <h5>12:00 pm - 08:00 pm</h5>
                                    <hr />
                                    <h5>Time Since Arrival</h5>
                                    <h5>00:00:00</h5>
                                    <form method="post" id="time_input" action='/api/create/timestamp/'></form>
                                    <button
                                        type="button"
                                        className="btn btn-lg w-100 btn-block btn-primary"
                                        value="Start Time"
                                        form="time_input"
                                        // onClick={() => StartTimer(rowID)}
                                    >
                                        Start Timer
                                    </button>
                                </div>
                            </div> */}
                            
                            {reservations.map((row, i) => 
                                <div key={i} id={i}>
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
                                        id={i}
                                        rowID={row.ID}
                                        makerID={row.MakerId}
                                        starttimer={row.starttimer}
                                        stoptimer={row.stoptimer}
                                        activeState={row.Active}
                                        name={row.Name}
                                        phone={row.Phone}
                                        Token={row.Token}
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