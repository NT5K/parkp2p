import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
// import StreetView from './StreetView';


const styles = {
  overflow: "hidden",
  height: "100%",
  // paddingTop: "3%",
  // paddingLeft: "3%",
  // paddingBottom: "3.7%",
  border: "5px grey solid",
}

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
    const { /* position, */ description, address, } = this.props.location
    if (!token) {
      return (
        <div>
          <Redirect to='/login' />
        </div>
      )
    }

    return (
    
      <div className="bg-light text-dark container h-100 pt-4">
        <div className="row">

          <div className="col-md-5">
            <div className="row">
              <div className="col-md-4 mr-5">
                <div className="row text-center">
                    <h6>Address:</h6>
                </div>
                <div className="row">
                  <p>{address}</p>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                    <h6>Description:</h6>
                </div>
                <div className="row">
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 p-4" style={styles}>
            {/* <div className="row d-flex justify-content-between">
              <div className="col-xs-3">
                <h6><u>Rates</u></h6>
              </div>
              <div className="col-xs-3">
                <h6><u>Price</u></h6>
              </div>
              <div className="col-xs-3">
                <h6><u>Duration</u></h6>
              </div>
              <div className="col-xs-3">
                <h6><u>Date</u></h6>
              </div>
            </div> */}
          
            {/* hourly */}
            <div className="row d-flex justify-content-between">
              <div className="col-xs-3">
                <p>Hourly</p>
              </div>
              <div className="col-xs-3">
                <p>${this.props.location.hourly}</p>
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Duration" /> 
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Date" /> 
              </div>
            </div>

            {/* daily */}
            <div className="row d-flex justify-content-between">
              <div className="col-xs-3">
                <p>Daily</p>
              </div>
              <div className="col-xs-3">
                <p> ${this.props.location.daily}</p>
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Duration" /> 
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Date" /> 
              </div>
            </div>

            {/* weekly */}
            <div className="row d-flex justify-content-between">
              <div className="col-xs-3">
                <p>Weekly</p>
              </div>
              <div className="col-xs-3">
                <p>${this.props.location.weekly}</p>
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Duration" /> 
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Date" /> 
              </div>
            </div>

            {/* monthly */}
            <div className="row d-flex justify-content-between">
              <div className="col-xs-3">
                <p>Monthly</p>
              </div>
              <div className="col-xs-3">
                <p>${this.props.location.monthly}</p>
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Duration" /> 
              </div>
              <div className="form-group w-25">
                <input type="text" className="form-control" id="example1" placeholder="Date" /> 
              </div>
            </div>

            {/* button */}
            <div className="row">
              <div className="col-md-12">
                <button type="button" className="btn btn-sm w-100 btn-success">Reserve a spot now!</button>
              </div>
            </div>  
          </div>

          {/* <div className="col-md-3 col-xs-12">
            {position != undefined &&
              <img
                src={
                  "https://maps.googleapis.com/maps/api/streetview?size=370x380&location=" +
                  this.props.location.position.lat + "," + this.props.location.position.lng +
                  "&fov=80&heading=70&pitch=0&key=AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g"
                }
                alt="No StreetView Images available"
                className="StreetView"
              />
            }
           </div> */}
        </div>
      </div>
    );
  }
}

export default Customers;