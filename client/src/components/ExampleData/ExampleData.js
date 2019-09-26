import React, { Component } from 'react';
import './ExampleData.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      token: localStorage.getItem('key')
    };
  }
  componentDidMount() {
    fetch('/api/customers?token=' + this.state.token)
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <div>
        <h2>Example Data From Database {this.state.token}</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={customer.ID}>{customer.Email} {customer.Username} {this.state.token}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Customers;
