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
      token: '',

      startDateValue: '',
      startTimeValue: '',

      endDateValue: '',
      endTimeValue: '',

      endDateTimeValue: '',
      rateValue: '',
      displayMessage: ''

    };
    this.onTextboxChangeStartDate = this.onTextboxChangeStartDate.bind(this);
    this.onTextboxChangeStartTime = this.onTextboxChangeStartTime.bind(this);

    this.onTextboxChangeEndDate = this.onTextboxChangeEndDate.bind(this);
    this.onTextboxChangeEndTime = this.onTextboxChangeEndTime.bind(this);

    this.onTextboxChangeRate = this.onTextboxChangeRate.bind(this);
    this.reserveSpot = this.reserveSpot.bind(this);
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

  onTextboxChangeStartDate(event) {
    this.setState({
      startDateValue: event.target.value,
    });
  }
  onTextboxChangeStartTime(event) {
    this.setState({
      startTimeValue: event.target.value,
    });
  }
  onTextboxChangeEndDate(event) {
    this.setState({
      endDateValue: event.target.value,
    });
  }
  onTextboxChangeEndTime(event) {
    this.setState({
      endTimeValue: event.target.value,
    });
  }

  onTextboxChangeRate(event) {
    const selectedValue = document.getElementById("rate_value").value
    console.log(selectedValue)
    this.setState({
      rateValue: selectedValue
    });
  }

  reserveSpot(event) {
    event.preventDefault()
    // grab state
    const { 
      startDateValue,
      startTimeValue,
      endDateValue,
      endTimeValue,
      rateValue,
      token
    } = this.state;
    // post to backend
    fetch('/api/reserve/spot', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        startDateValue,
        startTimeValue,
        endDateValue,
        endTimeValue,
        rateValue
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        // set state for display
        if (json.success) {
          this.setState({
            displayMessage: "Congratulations! You reserved a spot!"
          });
        }
      });
  }
  
  render() {
    const { token } = this.state
    const { startDateValue, startTimeValue, endDateValue, endTimeValue, rateValue, displayMessage  } = this.state
    const { onTextboxChangeStartDate, onTextboxChangeStartTime, onTextboxChangeEndDate, onTextboxChangeEndTime,  onTextboxChangeRate, reserveSpot } = this
    // const sel = document.getElementById('rate_value').value;
    // const opt = sel.options[sel.selectedIndex];
    // const { lat, lng } = this.props.location.position
    const { /* position, */ description, address, city, state, zipcode, hourly, daily, weekly, monthly, spots, id} = this.props.location

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


                  <form className="reserve_spot" method="post" action="/api/reserve/spot">
                    <h5 className="card-title pricing-card-title">Approximate Length of stay</h5>

                    <div className="row">
                      <div className="col-6">
                        <h6>Start Date</h6>
                        <input
                          id="start_date"
                          type="date"
                          value={startDateValue}
                          onChange={onTextboxChangeStartDate}
                          required>
                        </input>
                      </div>
                      <div className="col-6">
                        <h6>Start Time</h6>
                        <input
                          id="start_time"
                          type="time"
                          value={startTimeValue}
                          onChange={onTextboxChangeStartTime}
                          required>
                        </input>
                      </div>
                    </div>
                  <div className="row">
                    <div className="col-6">
                      <h6>End Date</h6>
                      <input
                        id="end_date"
                        type="date"
                        value={endDateValue}
                        onChange={onTextboxChangeEndDate}
                        className="mb-3"
                        required>
                      </input>
                    </div>
                    <div className="col-6">
                      <h6>End Time</h6>
                      <input
                        id="end_time"
                        type="time"
                        value={endTimeValue}
                        onChange={onTextboxChangeEndTime}
                        className="mb-3"
                        required>
                      </input>
                    </div>
                  </div>  
                  <hr />
              
                  <select className="w-100" id="rate_value" onChange={onTextboxChangeRate}>
                    <option value="blank">Rates</option>
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
                      type="submit"
                      className="btn btn-md w-100 btn-block btn-primary mt-4"
                      onClick={reserveSpot}
                    >
                      Reserve Now!
                    </button>
                    <h6>{displayMessage}</h6>
                  </form>  


                </div>
              </div>
            </div>
          </div> {/* end  big row */}
            <p>Start Date: {startDateValue}</p>
            <p>Start Time: {startTimeValue}</p>
            <p>End Date: {endDateValue}</p>
            <p>End Time: {endTimeValue}</p>
            {/* <p>End Date: {endDateTimeValue}</p> */}
            <p>Rate: {rateValue}</p>
            {/* <p>Rate: {Object.value(daily)}</p> */}
            <p>OwnerId: {id}</p>
        </div>
    );
  }
}

export default Customers;