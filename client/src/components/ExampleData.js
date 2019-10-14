import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom'


const styles = {
  overflow: "hidden",
  height: "50vh"
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
              <div className="col-6 bg-dark">
                <h4>Address:</h4>
                <h4>Description:</h4>
                <h4>Hourly Rate:</h4>
                <h4>Daily Rate:</h4>
                <h4>Weekly Rate:</h4>
                <h4>Monthly Rate:</h4>
                <button type="button" className="btn btn-success">Reserve This Spot!</button>
              </div>
              <div className="col-6 bg-dark" style={{borderRight: "10px, white, solid"}}>
                <h4>-{this.props.location.address}</h4>
                <h4>-{this.props.location.description}</h4>
                <h4>${this.props.location.hourly}</h4>
                <h4>${this.props.location.daily}</h4>
                <h4>${this.props.location.weekly}</h4>
                <h4>${this.props.location.monthly}</h4>
                
                
              
          </div>
        </div>
      </div>
    );
  }
}

export default Customers;