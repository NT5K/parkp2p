import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
import StreetView from './StreetView';


const styles = {
  overflow: "hidden",
  height: "100%",
  paddingTop: "3%",
  paddingLeft: "3%",
  paddingBottom: "3.7%",
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
              <div className="col-md-3 bg-dark">
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
              <div className="col-md-3 bg-dark text-center" style={{paddingBottom:"-3.7%"}}>
               
{this.props.location.position != undefined &&
<img src={"https://maps.googleapis.com/maps/api/streetview?size=370x380&location=" + this.props.location.position.lat + "," + this.props.location.position.lng +
"&fov=80&heading=70&pitch=0&key=AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g"} alt="No StreetView Images available" className="StreetView" />
        }
    
    </div>
     
    
                  
                  <div className="col-md-6 bg-dark text-center">
                <div className="row">
                   <div className="col-md-6 bg-dark text-center">
                        <h5>Hourly Rate: ${this.props.location.hourly}</h5>
                          < br />
                        <h5>Daily Rate: ${this.props.location.daily}</h5>
                          < br />
                        <h5>Weekly Rate: ${this.props.location.weekly}</h5>
                          < br />
                        <h5>Monthly Rate: ${this.props.location.monthly}</h5>
                        < br />
                              <button type="button" className="btn btn-success">Future Reservation</button>
                  </div>
                  
                    <div className="col-md-6 bg-dark justify-content-center">
                      <h5><input type="text" /></h5>
                            < br />
                      <h5><input type="text" /></h5>
                            < br />
                      <h5><input type="text" /></h5>
                            < br />
                      <h5><input type="text" /></h5>
                      <button type="button" className="btn btn-success">Reserve Now</button>
            
                    </div>
                </div>
       </div>
      </div>
      </div>
    );
  }
}

export default Customers;