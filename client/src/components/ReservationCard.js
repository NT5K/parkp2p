import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import DateDiff from 'date-diff';
const convertTime = require('convert-time');

class ReservationCard extends Component {
    constructor(props) {
        super(props); this.state = {
            open: false,
            displayTime: '00:00:00'
        }
        this.deleteRes = this.deleteRes.bind(this);
        this.StartTimer = this.StartTimer.bind(this);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

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
                this.onCloseModal()
            } 
        });
    }

    StartTimer(rowToChange, startTimeProp) {
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
                // date: Date().now
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log('json', json);
                // set state for display
                if (json.success) {
                    let date2 = new Date(startTimeProp);
                    let date1 = new Date()
                    let diff = new DateDiff(date1, date2);
                    console.log('date added to database')
                    console.log('calculated time ', diff.hours())
                    
                }
            });
    }

    // StopTimer(rowToChange) {
    //     let stopDate = new Date(this.props.stoptimer);
    //     let date2 = new Date(this.props.starttimer);
    //     let calculatedTime = new DateDiff(stopDate, date2);
    //     let rateWithFee = this.props.rate + this.props.fee;
    //     fetch('/api/stop/timestamp/', {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             rowID: rowToChange,
    //             date: Date().now,
    //             makerID: this.props.makerID,
    //             bill: calculatedTime.hours()*rateWithFee
                
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             console.log('json', json);
    //             // set state for display
    //             if (json.success) {
    //                console.log('stop time added to database')
    //             }
    //         })
    // }

    render() {
        const { deleteRes, StartTimer, onOpenModal } = this
        const { open, displayTime} = this.state;
        const { 
            number, id, rowID,
            address, city, state, zipcode, 
            rate, fee, 
            stay_type, 
            start_date, end_date, 
            start_time, end_time,
            starttimer, endtimer
        } = this.props

        const startTime = convertTime(start_time);
        console.log(start_time)
        const endTime = convertTime(end_time);
        const rateWithFee = rate + fee
        console.log(this.props.rowID)
        let date1 = new Date(start_date);
        let date2 = new Date(end_date);
        let diff = new DateDiff(date2, date1);
        diff.years();
        diff.months();
        console.log('dif days',diff.seconds())
        diff.days();
        diff.weeks();
        diff.hours();
        diff.minutes();
        diff.seconds();
        
        return (
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <h4 className="">Reservation {number}</h4>
                        </div>
                        <div className="col-2">
                            {/* <p role="button" onClick={() => deleteRes(id)}> x </p> */}
                            <p role="button" onClick={onOpenModal}> x </p>
                            <Modal open={open} onClose={this.onCloseModal} center>
                                <h2 className="mt-5">Delete this reservation?</h2>
                                <button className="btn btn-lg w-100 btn-block btn-primary" onClick={() => deleteRes(id)}> Yes </button>
                            </Modal>
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
                    <h6>Estimated Time</h6>
                    <h5>{diff.hours()} Hours</h5>
                    <hr />
                    {/* <h5>Time Since Arrival</h5>
                    <h5>{displayTime}</h5> */}
                    {/* <Timer
                        initialTime={diff.difference}
                        direction="forward"
                        startImmediately={true}
                        onStart={() => StartTimer(rowID)}
                        onStop={() => this.StopTimer(rowID)}>
                        {({ start, stop }) => (
                            <React.Fragment>
                                <div>
                                    <h5><Timer.Days />:<Timer.Hours />:<Timer.Minutes />:<Timer.Seconds /></h5>
                                
                                </div>
                                <div>
                                    
                                   
                                    <button 
                                    type="button"
                                    className="btn btn-lg w-100 btn-block btn-primary"
                                    form="time_input"
                                    onClick={stop}
                                    >Stop Timer
                                    </button>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>      */}<form method="post" id="time_input" action='/api/create/timestamp/'> <button
                                        type="button"
                                        className="btn btn-lg w-100 btn-block btn-primary"
                                        value="Start Time"
                                        id="startButton"
                                        form="time_input"
                                        onClick={() => StartTimer(rowID)}
                                        
                                    >
                                        Start Reservation
                                    </button>
                                    </form>
                </div>
            </div>
        )
    }
}

export default ReservationCard;