import React, { Component } from "react";
const convertTime = require('convert-time');

class ReservationCard extends Component {
    constructor(props) {
        super(props);
        this.deleteRes = this.deleteRes.bind(this);
    }

    deleteRes = (idFromCard) => {
        // remove div by id 
        document.getElementById(idFromCard).remove()
        const { rowID, makerID } = this.props
        // remove column from reservations database
        // add one to the makers spot count
        fetch('/api/reserve/remove', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               rowID,
               makerID
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log('json', json);
            // set state for display
            if (json.success) {
                console.log("spot deleted, spot added to maker")
            } 
        });
    }

    StartTimer(rowToChange) {
        // event.preventDefault()
        // // grab state
        // const { rowID } = this.props
        // post to backend
        fetch('/api/create/timestamp/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rowID: rowToChange,
                date: Date().now
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('json', json);
                // set state for display
                if (json.success) {
                   console.log('date added to database')
                }
            });
    }

    render() {
        const { deleteRes, StartTimer } = this
        const { 
            number, id,
            address, city, state, zipcode, 
            rate, fee, 
            stay_type, 
            start_date, end_date, 
            start_time, end_time, rowID
        } = this.props

        const startTime = convertTime(start_time);
        const endTime = convertTime(end_time);
        const rateWithFee = rate + fee
        console.log(this.props.rowID)
        
        return (
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <h4 className="">Reservation {number}</h4>
                        </div>
                        <div className="col-2">
                            <p role="button" onClick={() => deleteRes(id)}> x </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title pricing-card-title">{address}</h5>
                    <h6 className="card-title pricing-card-title">{city}, {state} {zipcode}</h6>
                    <hr />
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
                    <form method="post" id="time_input" action='/api/create/timestamp/'></form>
                    <button
                        type="button"
                        className="btn btn-lg w-100 btn-block btn-primary"
                        value="Start Time"
                        form="time_input"
                        onClick={() => StartTimer(rowID)}
                    >
                        Start Timer
                    </button>
                    <h1>{rowID}</h1>
                </div>
            </div>
        )
    }
}

export default ReservationCard;