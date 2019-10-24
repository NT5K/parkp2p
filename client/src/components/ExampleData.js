import React, { Component } from 'react';
import store from 'store'
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
import moment, {days} from  'moment'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import Datetime from 'react-datetime';
// import { DateRangePicker } from 'react-dates';

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


      startDate: null,
      endDate: null,
      date: null,
      focusedInput: null,
    };

    this.onTextboxChangeStartDate = this.onTextboxChangeStartDate.bind(this);
    this.onTextboxChangeStartTime = this.onTextboxChangeStartTime.bind(this);
    this.onTextboxChangeEndDate = this.onTextboxChangeEndDate.bind(this);
    this.onTextboxChangeEndTime = this.onTextboxChangeEndTime.bind(this);
    this.onTextboxChangeRate = this.onTextboxChangeRate.bind(this);
    this.reserveSpot = this.reserveSpot.bind(this);
    this.reserveHourly = this.reserveHourly.bind(this);
    this.reserveDaily = this.reserveDaily.bind(this);
  }

  // if token in local storage, set token state to token value
  UNSAFE_componentWillMount() {
    localStorage.getItem('park_p2p') && this.setState({
      token: store.get('park_p2p').token
    })
    // console.log("state of token", this.state.token)
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
    this.setState({
      rateValue: selectedValue
    });
  }

  reserveSpot(event) {
    event.preventDefault()
    let rateFromInputNumber = ''
    let typeOfRate = ''
    let feeValue = ''
    
    const { 
      Hourly, Daily, Weekly, Monthly, 
      ID, Address, City, State, Zipcode,
      Name, Phone_Number
    } = this.props.location
    console.log(Phone_Number)
    const { 
      startDateValue,
      startTimeValue,
      endDateValue,
      endTimeValue,
      rateValue,
      token,
      startDate,
      endDate,
      date
    } = this.state;

    // const dateMoment = moment(date).format('LL')
    // console.log('2', moment(date).format('LL'))
    // const onlyDate = moment(date).subtract(10, 'days').calendar()
    // console.log('onlyDate? 11/11/11', onlyDate)
    // console.log('start time val', startTimeValue)
    // console.log('combined string    ', JSON.stringify(dateMoment + " " + startTimeValue))
    // const startHoursTime = dateMoment + " " + startTimeValue
    // const endHoursTime = dateMoment + " " + endTimeValue
    var travelTime = moment(date).add(24, 'hours')
    console.log('add 24 hrs  ',travelTime)
    const moment24HrsAdded = moment(travelTime).add(days, 'd').toString()
    console.log('moment with 24 hrs added   ', moment24HrsAdded)

    if (rateValue < 2 && rateValue > 0) {
      rateFromInputNumber = Hourly
      typeOfRate = "Hour"
      feeValue = "0.25"
    }
    if (rateValue < 3 && rateValue > 1) {
      rateFromInputNumber = Daily
      typeOfRate = "Day"
      feeValue = "2.00"
    }
    if (rateValue < 4 && rateValue > 2) {
      rateFromInputNumber = Weekly
      typeOfRate = "Week"
      feeValue = "12.00"
    }
    if (rateValue < 5 && rateValue > 3) {
      rateFromInputNumber = Monthly
      typeOfRate = "Month"
      feeValue = "35.00"
    }

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

        rateValue: rateFromInputNumber,
        rateType: typeOfRate,
        feeValue,

        makerId: ID,
        address: Address,
        city: City,
        state: State,
        zipcode: Zipcode,

        // name: Name,
        // phone: Phone_Number,

        startDate: moment(this.state.startDate).add(days, 'd').toString() ,
        endDate: moment(this.state.endDate).add(days, 'd').toString(),

        // startDate: startHoursTime ,
        // endDate: endHoursTime
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
      } else {
        this.setState({
          displayMessage: "Please fill out all information."
        });
      }
    });
  }
  reserveHourly(event) {
    event.preventDefault()
    let rateFromInputNumber = ''
    let typeOfRate = ''
    let feeValue = ''
    
    const { 
      Hourly, Daily, Weekly, Monthly, 
      ID, Address, City, State, Zipcode,
      Name, Phone_Number
    } = this.props.location
    console.log(Phone_Number)
    const { 
      startDateValue,
      startTimeValue,
      endDateValue,
      endTimeValue,
      rateValue,
      token,
      date,
      startDate,
    } = this.state;

    const dateMoment = moment(date).format('LL')
    console.log('2', moment(date).format('LL'))
    const onlyDate = moment(date).subtract(10, 'days').calendar()
    console.log('onlyDate? ', onlyDate)
    console.log('start time val', startTimeValue)
    console.log('combined string    ', JSON.stringify(dateMoment + " " + startTimeValue))
    const startHoursTime = dateMoment + " " + startTimeValue
    const endHoursTime = dateMoment + " " + endTimeValue

    if (rateValue < 2 && rateValue > 0) {
      rateFromInputNumber = Hourly
      typeOfRate = "Hour"
      feeValue = "0.25"
    }
    if (rateValue < 3 && rateValue > 1) {
      rateFromInputNumber = Daily
      typeOfRate = "Day"
      feeValue = "2.00"
    }
    if (rateValue < 4 && rateValue > 2) {
      rateFromInputNumber = Weekly
      typeOfRate = "Week"
      feeValue = "12.00"
    }
    if (rateValue < 5 && rateValue > 3) {
      rateFromInputNumber = Monthly
      typeOfRate = "Month"
      feeValue = "35.00"
    }

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

        rateValue: rateFromInputNumber,
        rateType: typeOfRate,
        feeValue,

        makerId: ID,
        address: Address,
        city: City,
        state: State,
        zipcode: Zipcode,

        name: Name,
        phone: Phone_Number,

        startDate: startHoursTime,
        endDate: endHoursTime 
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
      } else {
        this.setState({
          displayMessage: "Please fill out all information."
        });
      }
    });
  }
  reserveDaily(event) {
    event.preventDefault()
    let rateFromInputNumber = ''
    let typeOfRate = ''
    let feeValue = ''
    
    const { 
      Hourly, Daily, Weekly, Monthly, 
      ID, Address, City, State, Zipcode,
      Name, Phone_Number
    } = this.props.location
    console.log(Phone_Number)
    const { 
      startDateValue,
      startTimeValue,
      endDateValue,
      endTimeValue,
      rateValue,
      token,
      date,
      startDate,
    } = this.state;

    // const dateMoment = moment(date).format('LL')
    // console.log('2', moment(date).format('LL'))
    // const onlyDate = moment(date).subtract(10, 'days').calendar()
    // console.log('onlyDate? ', onlyDate)
    // console.log('start time val', startTimeValue)
    // console.log('combined string    ', JSON.stringify(dateMoment + " " + startTimeValue))
    // const startHoursTime = dateMoment + " " + startTimeValue
    // const endHoursTime = dateMoment + " " + endTimeValue
    const travelTime = moment(date).add(24, 'hours')
    console.log('add 24 hrs  ',travelTime)
    const moment24HrsAdded = moment(travelTime)
    console.log('moment with 24 hrs added   ', moment24HrsAdded)

    if (rateValue < 2 && rateValue > 0) {
      rateFromInputNumber = Hourly
      typeOfRate = "Hour"
      feeValue = "0.25"
    }
    if (rateValue < 3 && rateValue > 1) {
      rateFromInputNumber = Daily
      typeOfRate = "Day"
      feeValue = "2.00"
    }
    if (rateValue < 4 && rateValue > 2) {
      rateFromInputNumber = Weekly
      typeOfRate = "Week"
      feeValue = "12.00"
    }
    if (rateValue < 5 && rateValue > 3) {
      rateFromInputNumber = Monthly
      typeOfRate = "Month"
      feeValue = "35.00"
    }

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

        rateValue: rateFromInputNumber,
        rateType: typeOfRate,
        feeValue,

        makerId: ID,
        address: Address,
        city: City,
        state: State,
        zipcode: Zipcode,

        name: Name,
        phone: Phone_Number,

        startDate: date,
        endDate: moment24HrsAdded 
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
      } else {
        this.setState({
          displayMessage: "Please fill out all information."
        });
      }
    });
  }
  
  render() {
    const { 
      token,
      startTimeValue,  
      endTimeValue, 
      // rateValue, 
      displayMessage  
    } = this.state
    const { 
      onTextboxChangeStartTime, 
      onTextboxChangeEndTime,  
      onTextboxChangeRate, 
      reserveSpot,
      reserveHourly,
      reserveDaily
    } = this
    const { 
      Description, Instructions,
      Address, City, State, Zipcode, 
      Hourly, Daily, Weekly, Monthly, 
      Spots /*ID*/
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
            <div className="row mb-4">
              <h5>{Instructions}</h5>
            </div>
            <div className="row">
              <h5>Available Spots: {Spots}</h5>
            </div>
          </div> {/* end first column */}


          <div className="col-md-5 col-xs-12">
            <div className="card text-center mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Reservation form</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title pricing-card-title">{Address}</h5>
                <h6 className="card-title pricing-card-title">{City} {State} {Zipcode}</h6>
                <hr />
                <select className="w-100 form-control" id="rate_value" onChange={onTextboxChangeRate}>
                  <option value="blank">Rate Type</option>
                  <option value="1">${Hourly} per hour</option>
                  <option value="2">${Daily} per day</option>
                  <option value="3">${Weekly} per week</option>
                  <option value="4">${Monthly} per month</option>
                </select>
                <hr />
                <form className="reserve_spot" method="post" action="/api/reserve/spot">
                  


                  {(() => {
                    switch (this.state.rateValue) {
                      // HOURLY
                      case "1": return <div>
                        <hr />
                        <h6 className="card-title pricing-card-title">Hourly Stay</h6>
                        <div className="row">
                          <div className="col-12">
                            <SingleDatePicker
                              date={this.state.date}
                              onDateChange={date => this.setState({ date })}
                              focused={this.state.focused}
                              onFocusChange={({ focused }) => this.setState({ focused })}
                              id="your_unique_id"
                              orientation="vertical" verticalHeight={400}
                              openDirection="up"
                            />
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
                      </div>;

                      // DAILY
                      case "2": return <div>
                        <h6 className="card-title pricing-card-title">Daily</h6>
                        <SingleDatePicker
                          date={this.state.date}
                          onDateChange={date => this.setState({ date })}
                          focused={this.state.focused}
                          onFocusChange={({ focused }) => this.setState({ focused })}
                          id="your_unique_id"
                          orientation="vertical" verticalHeight={400}
                          openDirection="up"
                        />
                      </div>

                      //WEEKLY
                      case "3": return <div>
                        <h6 className="card-title pricing-card-title">Weekly</h6>
                        <div className="row">
                          <div className="col-12">
                            <DateRangePicker
                              startDateId="startDate"
                              endDateId="endDate"
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
                              focusedInput={this.state.focusedInput}
                              onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
                              orientation="vertical" verticalHeight={400}
                              openDirection="up"
                            />
                          </div>
                        </div>
                      </div>;
                      case "4": return <div>
                      <h6 className="card-title pricing-card-title">Monthly</h6>
                        <div className="row">
                          <div className="col-12">
                            <DateRangePicker
                              startDateId="startDate"
                              endDateId="endDate"
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
                              focusedInput={this.state.focusedInput}
                              onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
                              orientation="vertical" verticalHeight={400}
                              openDirection="up"
                            />
                          </div>
                        </div>
                      </div>;
                default: return ;
              }
            })()}

                  <hr />
                 

                  {(() => {
                    switch (this.state.rateValue) {
                      case "1": return <button
                          type="submit"
                          className="btn btn-md w-100 btn-block btn-primary mt-4"
                          onClick={reserveHourly}
                        >
                          Reserve Now Hourly!
                        </button>
                      case "2": return <button
                        type="submit"
                        className="btn btn-md w-100 btn-block btn-primary mt-4"
                        onClick={reserveDaily}
                      >
                        Reserve Now Daily!
                      </button>;
                      case "3": return <button
                        type="submit"
                        className="btn btn-md w-100 btn-block btn-primary mt-4"
                        onClick={reserveSpot}
                      >
                        Reserve Now Weekly!
                      </button>;
                      case "4": return <button
                        type="submit"
                        className="btn btn-md w-100 btn-block btn-primary mt-4"
                        onClick={reserveSpot}
                      >
                        Reserve Now Monthly!
                      </button>;
                      default: return <button
                        type="submit"
                        className="btn btn-md w-100 btn-block btn-primary mt-4"
                        onClick={reserveSpot}
                      >
                        Reserve Now!
                      </button>;
                    }
                  })()}

                  <h6 className="pt-3">{displayMessage}</h6>
                </form>  
              </div>
            </div>
          </div>
        </div> {/* end  big row */}

          {/* <h3>{this.props.Phone}</h3> */}
          {/* <p>Start Date: {startDateValue}</p> */}
          {/* <p>Start Time: {startTimeValue}</p> */}
          {/* <p>End Date: {endDateValue}</p> */}
          {/* <p>End Time: {endTimeValue}</p> */}
          {/* <p>Rate: {rateValue}</p> */}
          {/* <p>{Date()}</p> */}
          {/* <p>OwnerId: {ID}</p> */}
          {/* <p>option name: {document.getElementById("rate_value").value}</p> */}
      </div>
    );
  }
}

export default Customers;