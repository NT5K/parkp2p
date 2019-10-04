import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';

import { Redirect } from 'react-router-dom'

// get token value from local storage
class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      token: ''
    };
  }

  // if token in local storage, set token state to token value
  componentWillMount() {
    localStorage.getItem('park_p2p') && this.setState({
      token: store.get('park_p2p').token
    })
  }
  componentDidMount() {
    fetch('/api/customers?token=' + this.state.token)
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
      <div>
        <div className="row">
          <div className="col-6 border-right">
            <div className="row">
              <div className="col-6">
                <p>Address:</p>
                <p>Description:</p>
                <p>Hourly Rate:</p>
                <p>Daily Rate:</p>
                <p>Weekly Rate:</p>
                <p>Monthly Rate:</p>
              </div>
              <div className="col-6">
                {this.props.location && <p>{this.props.location.address}</p>}
                {this.props.location && <p>{this.props.location.description}</p>}
                {this.props.location && <p>{this.props.location.hourly}</p>}
                {this.props.location && <p>{this.props.location.daily}</p>}
                {this.props.location && <p>{this.props.location.weekly}</p>}
                {this.props.location && <p>{this.props.location.monthly}</p>}
              </div>
            </div>
          </div>
          
          <div className="col-6">
            <p><u>Example Data</u></p>
            <p>Local Storage Token: {this.state.token}</p>
            <p>Current users on old database:</p>
            {this.state.customers.map(customer =>
              <span key={customer.ID}>{customer.Email} {customer.Password} {this.state.token}</span>
            )}
          </div>

         
        </div>
      </div>
    
        
      
    );
  }
}

export default Customers;
