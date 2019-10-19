import React, { Component } from "react";

class ReservationCard extends Component {
    render() {
        // console.log(this.props)
        return (
            
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Reservation {this.props.number}</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title pricing-card-title">{this.props.address}</h5>
                            <h6 className="card-title pricing-card-title">{this.props.city}, {this.props.state} {this.props.zipcode}</h6>
                            <h6 className="card-title pricing-card-title"></h6>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Rate: ${this.props.rate}/{this.props.stay_type}</li>
                                <li>Fee: ${this.props.fee}/{this.props.stay_type}</li>
                                <li>Total: {this.props.rate + this.props.fee}/{this.props.stay_type}</li>
                            </ul>
                            <h6>Date: {this.props.start_date} - {this.props.end_date}</h6>
                            <h6>Allotted Time: {this.props.start_time} - {this.props.end_time}</h6>
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