import React, { Component } from 'react';
import './ExampleData.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {
    return (
      <div>
        <h2>Example Data From Database</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={customer.ID}>{customer.Email} {customer.Username}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Customers;
