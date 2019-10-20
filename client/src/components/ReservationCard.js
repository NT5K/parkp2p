import React, { Component } from "react";
const convertTime = require('convert-time');

class ReservationCard extends Component {
    
    render() {
        const { 
            number, 
            address, city, state, zipcode, 
            rate, fee, 
            stay_type, 
            start_date, end_date, 
            start_time, end_time 
        } = this.props
        const startTime = convertTime(start_time);
        const endTime = convertTime(end_time);
        const rateWithFee = rate + fee
        // console.log(this.props)
        return (
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Reservation {number}</h4>
                </div>
                <div className="card-body">
                    <h5 className="card-title pricing-card-title">{address}</h5>
                    <h6 className="card-title pricing-card-title">{city}, {state} {zipcode}</h6>
                    <hr />
                    
                    <h6 className="card-title pricing-card-title"></h6>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li>Rate: ${rate}/{stay_type}</li>
                        <li>Fee: ${fee}/{stay_type}</li>
                        <li>Total: ${rateWithFee}/{stay_type}</li>
                    </ul>
                    <hr />
                    <h6>Estimated Dates</h6>
                    <h5>{start_date} - {end_date}</h5>
                    
                    <h6>Estimated Times</h6>
                    <h5>{startTime} - {endTime}</h5>
                    <hr />
                    <h5>Time Since Arrival</h5>
                    <h5>00:25:00</h5>
                    <button
                        type="button"
                        className="btn btn-lg w-100 btn-block btn-primary"
                        value="Start Time"
                        onClick={"this.props.onClick"}
                    >
                        Start Timer
                    </button>
                </div>
            </div>
        )
    }
}

export default ReservationCard;