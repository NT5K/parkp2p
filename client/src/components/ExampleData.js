import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
// import StreetView from './StreetView';

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
      displayMessage: '',

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
    const { 
      token,
      startDateValue, 
      startTimeValue, 
      endDateValue, 
      endTimeValue, 
      rateValue, 
      displayMessage  
    } = this.state
    const { 
      onTextboxChangeStartDate, 
      onTextboxChangeStartTime, 
      onTextboxChangeEndDate, 
      onTextboxChangeEndTime,  
      onTextboxChangeRate, 
      reserveSpot 
    } = this
    const { 
      // position 
      Description, Instructions,
      Address, City, State, Zipcode, 
      Hourly, Daily, Weekly, Monthly, 
      Spots, 
      ID
    } = this.props.location

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
              <h4>Address</h4>
            </div>
            <div className="row">
            <h2>{Address}</h2>
            </div>
            <div className="row">
              <h2>{City} {State} {Zipcode}</h2>
            </div>
            <div className="row pt-3">
              <h4>Rates:</h4>
            </div>
            <div className="row pb-1">
              <h3>${Hourly}/hr ${Daily}/day ${Weekly}/week ${Monthly}/month</h3>
            </div>
            <hr />
            <div className="row pt-3">
              <h5>Description:</h5>
            </div>
            <div className="row">
              <h5>{Description}</h5>
            </div>
            <div className="row pt-3">
              <h5>Parking Instructions:</h5>
            </div>
            <div className="row mb-5">
              <h5>{Instructions}</h5>
            </div>
          </div> {/* end first column */}
          <div className="col-md-5 col-xs-12">
            <div className="card text-center mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Spot reservation form</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title pricing-card-title">{Address}</h5>
                <h6 className="card-title pricing-card-title">{City} {State} {Zipcode}</h6>
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
                        className="mb-3 form-control date-local"
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
                        className="mb-3 form-control time-local"
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
                      className="mb-3 form-control date-local"
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
                      className="mb-3 form-control time-local"
                      required>
                    </input>
                  </div>
                </div>  
                <hr />
                <select className="w-100" id="rate_value" onChange={onTextboxChangeRate}>
                  <option value="blank">Rates</option>
                    <option value={Hourly}>${Hourly}/hour (-12 hrs)</option>
                    <option value={Daily}>${Daily}/daily (+12 hrs)</option>
                    <option value={Weekly}>${Weekly}/week (5 days)</option>
                    <option value={Monthly}>${Monthly}/month (4 weeks)</option>
                  </select>
                  <hr />
                  <h6>
                    Available Spots: {Spots}
                  </h6>
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-md w-100 btn-block btn-primary mt-4"
                    onClick={reserveSpot}
                  >
                    Reserve Now!
                  </button>
                  <h6 className="pt-3">{displayMessage}</h6>
                </form>  
              </div>
            </div>
          </div>
        </div> {/* end  big row */}
          {/* <p>Start Date: {startDateValue}</p>
          <p>Start Time: {startTimeValue}</p>
          <p>End Date: {endDateValue}</p>
          <p>End Time: {endTimeValue}</p>
          <p>Rate: {rateValue}</p>
          <p>OwnerId: {ID}</p>
          <p>{Date()}</p> */}
      </div>
    );
  }
}

export default Customers;