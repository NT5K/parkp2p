import React, { Component } from 'react';
import './ExampleData.css';
// import StreetView from '../GoogleMap/streetView'

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
        {this.props.location && <p>{this.props.location.name}</p>}
        {/* {this.props.location && <StreetView location={this.props.location.position}></StreetView>} */}
      </div>
    );
  }
}

export default Customers;
