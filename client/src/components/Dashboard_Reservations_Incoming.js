import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store';
import 'whatwg-fetch';
import ReservationCardIncoming from './ReservationCardIncoming'

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
        fetch('/api/reservations/maker/' + token)
        .then(res => res.json())
        .then(reservations => {
            this.setState({
                reservations
            })
        // }, () => console.log("reservations array", reservations, "this users token", token))
        }, () => console.log("success"))
    }   


    //renders the dashboard for reservations and takes a sql call that sets state and passes the props to the reservationcardIncomming component.
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
                        <h4>Reservations for my driveway </h4>
                    </div>
                </div>
                <div className="row mt-3 d-flex justify-content-between text-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="card-deck mb-3 text-center d-flex justify-content-between">
                            
                            {reservations.map((row, i) => { 
                                    
                                    const carInfo = fetch('/api/account/personal/car/' + row.Token)
                                    .then(res => res.json())

                                    
                                    return (<div key={i} id={i}>
                                        
                                        <ReservationCardIncoming
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
                                            name={row.Customer_Name}
                                            phone={row.Phone_Number}
                                            car_info={carInfo}
                                        />
                                    </div>)
                                }   
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reservations