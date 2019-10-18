import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
// import StreetView from './StreetView';


// const styles = {
//   overflow: "hidden",
//   height: "100%",
//   // paddingTop: "3%",
//   // paddingLeft: "3%",
//   // paddingBottom: "3.7%",
//   border: "5px grey solid",
// }

class Customers extends Component {

  constructor() {
    super();
    this.state = {
      customers: [],
      token: ''
    };
  }

  // if token in local storage, set token state to token value
  UNSAFE_componentWillMount() {
    localStorage.getItem('park_p2p') && this.setState({
      token: store.get('park_p2p').token
    })
    // console.log("state of token", this.state.token)
  }

  componentDidMount() {
    fetch('/api/public/driveways')
      .then(res => res.json())
      .then(customers => this.setState({ customers }))
      // .then(() => console.log("session token", this.state.token))
  }

  // if logged in successfully redirect to main page
  redirectToLogin = () => {
    if (this.state.token) {
      return <Redirect to='/login' />
    }
  }

  render() {
    const { token } = this.state
    // const { lat, lng } = this.props.location.position
    const { /* position, */ description, address, city, state, zipcode, hourly, daily, weekly, monthly, spots} = this.props.location

    if (!token) {
      return (
        <div>
          <Redirect to='/login' />
        </div>
      )
    }

    return (
  
        <div className="bg-light text-dark container h-100 pt-4 mb-5">

          <div className="row p-3">
            <div className="col-md-7 col-xs-12">
              <div className="row">
                <h3>Address</h3>
              </div>
              <div className="row">
                <h2>{address}</h2>
              </div>
              <div className="row">
                <h2>{city} {state} {zipcode}</h2>
              </div>

              <div className="row pt-3">
                <h3>Rates:</h3>
              </div>
              <div className="row pb-1">
                <h3>${hourly}/hr ${daily}/day ${weekly}/week ${monthly}/month</h3>
              </div>
              <hr />
              <div className="row pt-3">
                <h5>Description:</h5>
              </div>
              <div className="row">
                <h5>{description}</h5>
              </div>
              <div className="row pt-3">
                <h5>Parking Instructions:</h5>
              </div>
              <div className="row mb-5">
                <h5>Please park on the left side of the driveway, about half way up.</h5>
              </div>
          
            </div> {/* end first column */}

            <div className="col-md-5 col-xs-12">
              <div className="card text-center mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Spot reservation form</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title pricing-card-title">{address}</h5>
                  <h6 className="card-title pricing-card-title">{city} {state} {zipcode}</h6>
                
                  <hr />

                  <h5 className="card-title pricing-card-title">Approximate Length of stay</h5>
                  <h6>Start Date/Time</h6>
                  <input id="party" type="datetime-local" name="partydate" value="2017-06-01T08:30"></input>
                  <h6>End Date/Time</h6>
                  <input id="party" type="datetime-local" name="partydate" value="2017-06-01T08:30" className="mb-3"></input>
                  <hr />
                  
                  {/* <ul className="list-unstyled mt-3 mb-4">
                    <li>Rate: efaeafe</li>
                    <li>Fee:feafa</li>
                    <li>Total: eafae</li>
                  </ul> */}
                  {/* <h6>
                    Length of stay: 
                    <span>
                      <input className="w-25 mr-3" type="number" id="numbrfield" placeholder="0"/>
                    </span>
                  </h6> */}
                  <select className="w-100">
                    <option>Rates</option>
                    <option value={hourly}>${hourly}/hour (-12 hrs)</option>
                    <option value={daily}>${daily}/daily (+12 hrs)</option>
                    <option value={weekly}>${weekly}/week (5 days)</option>
                    <option value={monthly}>${monthly}/month (4 weeks)</option>
                  </select>
                  <hr />
                  <h6>
                    Available Spots: {spots}
                  </h6>
                  <hr />
                  <button
                    type="button"
                    className="btn btn-md w-100 btn-block btn-primary mt-4"
                    value="Start Time"
                    onClick={"this.props.onClick"}
                  >
                    Reserve Now!
                  </button>
                </div>
              </div>
            </div>
          </div> {/* end  big row */}
        </div>
    );
  }
}

export default Customers;