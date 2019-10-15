import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom'


const styles = {
  overflow: "hidden",
  height: "50vh",
  paddingTop: "50px",
  paddingLeft: "20px",
  border: "5px grey solid"
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
    console.log("state of token", this.state.token)
  }

  componentDidMount() {
    fetch('/api/public/driveways')
      .then(res => res.json())
      .then(customers => this.setState({ customers }, () => console.log("session token", this.state.token)));
  }

  // if logged in successfully redirect to main page
  redirectToLogin = () => {
    if (this.state.token) {
      return <Redirect to='/login' />
    }
  }

  render() {
    const { token } = this.state

    if (!token) {
      return (
        <div>
          <Redirect to='/login' />
        </div>
      )
    }

    return (
      // <div className="bg-dark text-light h-100">
      <div className="bg-dark text-white" style={styles}>
        <div className="row">
              <div className="col-lg-6 col-md-12 bg-dark">
                <h4>Address:</h4>
                <h4>-{this.props.location.address}</h4>
            < br />< br />
                <h4>Description:</h4>
                <h4>-{this.props.location.description}</h4>
                < br />
                <h4>Available Spots:</h4>
                    2
            < br />
              </div>
              <div className="col-lg-6 col-md-12 bg-dark">
                <div className="row justify-content-left">
                  <div className="col-5">
                    
                    <h5>Hourly Rate: ${this.props.location.hourly}</h5>
                      < br />
                    <h5>Daily Rate: ${this.props.location.daily}</h5>
                      < br />
                    <h5>Weekly Rate: ${this.props.location.weekly}</h5>
                      < br />
                    <h5>Monthly Rate: ${this.props.location.monthly}</h5>
                    
                  </div>
                  <div className="col-1">
                    <h5><input type="text" /></h5>
                          < br />
                    <h5><input type="text" /></h5>
                          < br />
                    <h5><input type="text" /></h5>
                          < br />
                    <h5><input type="text" /></h5>
                  </div>
                </div>
              <div className="row justify-content-left">
                <div className="col-4">
                  <button type="button" className="btn btn-success">Reserve Now</button>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-success">Future Reservation</button>
                </div>
              </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Customers;