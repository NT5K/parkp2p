import React, { Component } from "react";

class SubscriptionPlanCard extends Component {
    render() {
        // console.log(this.props)
        return (
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{this.props.plan}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">${this.props.price} <small className="text-muted">/ mo</small></h1>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li>{this.props.info1}</li>
                        <li>{this.props.info2}</li>
                        <li>{this.props.info3}</li>
                    </ul>
                    <button 
                        type="button" 
                        className="btn btn-lg btn-block btn-primary"  
                        value={this.props.value} 
                        onClick={this.props.onClick}
                        // onChange={this.props.onChange}
                    >
                        Sign Up!
                    </button>
                </div>
            </div>
        )
    }
}

export default SubscriptionPlanCard;


