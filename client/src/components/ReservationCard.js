import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import DateDiff from 'date-diff';

class ReservationCard extends Component {
    constructor(props) {
        super(props); this.state = {
            open: false,
            open1: false,
            displayTime: '00:00:00',
            message: JSON.stringify(this.props.activeState),
            activeState: this.props.activeState
        }
        this.deleteRes = this.deleteRes.bind(this);
        // this.StartTimer = this.StartTimer.bind(this);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onOpenModal1 = () => {
        this.setState({ open1: true});
        this.setState({
    activeState: true
        });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onCloseModal1 = () => {
        this.setState({ open1: false });
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

    payReservation() {
        let rateWithFee = this.props.rate + this.props.fee;
        let Token = this.props.Token
        console.log("rowID",this.props.rowID)
        fetch('/api/stop/timestamp/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // rowID: rowToChange,
                makerID: this.props.makerID,
                bill: rateWithFee,
                Token: Token,
                ID: this.props.rowID
                
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log('json', json);
            // set state for display
            if (json.success) {
                console.log('Balance Updated in Database')
                console.log("Token passed", Token)
                this.onCloseModal1()
                this.setState({
                    message: 'Active'
                })
            }
        })
    }

    render() {
        const { deleteRes, onOpenModal, onOpenModal1} = this
        const { open, open1} = this.state;
        const { 
            number, id,
            address, city, state, zipcode, 
            rate, fee, 
            stay_type, 
            start_date, end_date
        } = this.props
        
        const rateWithFee = rate + fee
        let date1 = new Date(start_date);
        let date2 = new Date(end_date);
        let diff = new DateDiff(date2, date1);
        
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
                    <h5>{start_date}</h5>
                    <h5>{end_date}</h5>
                    <h6>Estimated Time</h6>
                    <h5>{diff.hours()} Hours</h5>
                    <hr />
                    {
                        (this.state.message < 1) ? <h6>Inactive</h6> : <h6>Active</h6>
                    }
                    <button  className="btn btn-lg w-100 btn-block btn-primary" onClick={onOpenModal1}> I'm Here </button> 
                                <Modal open={open1} onClose={this.onCloseModal1} center>
                                <h5 className="mt-5">This will charge you the rate <br/> of the premade reservation.</h5>
                                <button className="btn btn-lg w-100 btn-block btn-primary" onClick={() => this.payReservation()}> Pay for Reservation </button>
                            </Modal>
                </div>
            </div>
        )
    }
}

export default ReservationCard;