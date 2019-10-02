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
        <h2>Example Data From Database {this.state.token}</h2>
        <ul>
          {this.state.customers.map(customer =>
            <li key={customer.ID}>{customer.Email} {customer.Password} {this.state.token}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
