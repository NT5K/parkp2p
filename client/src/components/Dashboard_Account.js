import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store';
import 'whatwg-fetch';
import PersonalInfoRow from './PersonalInfoRow'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
            fullName: '',
            displayFullName: '',
            emailToPostRequest: '',
            displayEmail: '',
            phone_numberToPostRequest: '',
            displayPhoneNumber: '',
            displayFullAddress: '',
            addressToPostRequest: '',
            displayAddress: '',
            cityToPostRequest: '',
            displayCity: '',
            stateToPostRequest: '',
            displayState: '',
            zipcodeToPostRequest: '',
            displayZipcode: '',
            verifyMessage: ''
        };

        // bind 'this' for all functions
        this.onTextboxChangeName = this.onTextboxChangeName.bind(this);
        this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
        this.onTextboxChangePhone_Number = this.onTextboxChangePhone_Number.bind(this);
        this.onTextboxChangeAddress = this.onTextboxChangeAddress.bind(this);
        this.onTextboxChangeCity = this.onTextboxChangeCity.bind(this);
        this.onTextboxChangeState = this.onTextboxChangeState.bind(this);
        this.onTextboxChangeZipcode = this.onTextboxChangeZipcode.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateZipcode = this.updateZipcode.bind(this);
        this.verifyAddress = this.verifyAddress.bind(this);
    }

    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
        token: store.get('park_p2p').token
        })
    }

    // gets info based on token
    componentDidMount() {
        const { token } = this.state
        fetch('/api/account/personal/' + token)
        .then(res => res.json())
        .then(user => {
            const { Name, Email, Phone_Number , Address, City, Zipcode, State } = user[0] 
            // set state for displays
            this.setState({
                user: user[0], 
                displayFullName: Name,
                displayEmail: Email,
                displayPhoneNumber: Phone_Number,
                displayFullAddress: Address + ", " + City + ", " + State + " " + Zipcode,
                displayAddress: Address,
                displayCity: City,
                displayState: State, 
                displayZipcode: Zipcode
            })
        }, () => console.log("success"))
    }

    // passes input values to state for post request params
    onTextboxChangeName(event) {
        this.setState({
            fullName: event.target.value
        });
    }
    onTextboxChangeEmail(event) {
        this.setState({
            emailToPostRequest: event.target.value
        });
    }
    onTextboxChangePhone_Number(event) {
        this.setState({
            phone_numberToPostRequest: event.target.value
        });
    }
    onTextboxChangeAddress(event) {
        this.setState({
            addressToPostRequest: event.target.value
        });
    }
    onTextboxChangeCity(event) {
        this.setState({
            cityToPostRequest: event.target.value
        });
    }
    onTextboxChangeState(event) {
        this.setState({
            stateToPostRequest: event.target.value
        });
    }
    onTextboxChangeZipcode(event) {
        this.setState({
            zipcodeToPostRequest: event.target.value
        });
    }

    // update name post request
    updateName(event) {
        event.preventDefault()
        // grab state
        const { fullName, token } = this.state;
        // post to backend
        fetch('/api/account/update/name', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                fullName
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log('json', json);
            // set state for display
            if (json.success) {
                this.setState({
                    displayFullName: fullName
                });
            }
        });
    }

    // update email post request
    updateEmail(event) {
        event.preventDefault()
        // grab state
        const { emailToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/email', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                emailToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log('json', json);
            // set state for display
            if (json.success) {
                this.setState({
                    displayEmail: emailToPostRequest
                });
            }
        });
    }

    // update phone number post request
    updatePhone(event) {
        event.preventDefault()
        // Grab state
        const { phone_numberToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/phone', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                phone_numberToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
                this.setState({
                    displayPhoneNumber: phone_numberToPostRequest
                });
            }
        });
    }

    // update address post request
    updateAddress(event) {
        event.preventDefault()
        // Grab state
        const { addressToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/address', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                addressToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
                const { displayCity, displayState, displayZipcode } = this.state
                this.setState({
                    displayAddress: addressToPostRequest,
                    displayFullAddress: addressToPostRequest + ", " + displayCity + ", " + displayState + " " + displayZipcode
                });
            }
        });
    }

    // update city post request
    updateCity(event) {
        event.preventDefault()
        // Grab state
        const { cityToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/city', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                cityToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
                const { displayState, displayZipcode, displayAddress } = this.state
                this.setState({
                    displayCity: cityToPostRequest,
                    displayFullAddress: displayAddress + ", " + cityToPostRequest + ", " + displayState + " " + displayZipcode
                });
            }
        });
    }
    
    // update state post request
    updateState(event) {
        event.preventDefault()
        // Grab state
        const { stateToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/state', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                stateToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
                const { displayCity, displayZipcode, displayAddress } = this.state
                this.setState({
                    displayState: stateToPostRequest,
                    displayFullAddress: displayAddress + ", " + displayCity + ", " + stateToPostRequest + " " + displayZipcode
                });
            }
        });
    }

    // update zipcode post request
    updateZipcode(event) {
        event.preventDefault()
        // Grab state
        const { zipcodeToPostRequest, token } = this.state;
        // post to backend
        fetch('/api/account/update/zipcode', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                zipcodeToPostRequest
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            const { displayCity, displayState, displayAddress } = this.state
            if (json.success) {
                this.setState({
                    displayZipcode: zipcodeToPostRequest,
                    displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                });
            }
        });
    }

    // verify address and push generated coords to database for map
    verifyAddress(event) {
        event.preventDefault()
        // Grab state
        const { displayFullAddress, token } = this.state;
        // post to backend
        fetch('/api/account/verify/address', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                displayFullAddress
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
                this.setState({
                    verifyMessage: json.message
                })
            }
        });
    }

    render() {
        const { 
            token,
            fullName, 
            displayFullName, 
            displayEmail, 
            emailToPostRequest, 
            displayPhoneNumber, 
            phone_numberToPostRequest,
            displayFullAddress,
            addressToPostRequest,
            displayAddress,
            cityToPostRequest,
            displayCity,
            stateToPostRequest,
            displayState,
            zipcodeToPostRequest,
            displayZipcode,
            verifyMessage
        } = this.state

        const { 
            onTextboxChangeEmail, 
            updateEmail, 
            onTextboxChangeName,
            updateName,
            onTextboxChangePhone_Number,
            updatePhone,
            onTextboxChangeAddress,
            updateAddress,
            onTextboxChangeCity,
            updateCity,
            onTextboxChangeState,
            updateState,
            onTextboxChangeZipcode,
            updateZipcode,
            verifyAddress
        } = this

        // if no local storage token redirect to main page which then redirects to login
        if (!token) {
            return (
                <div>
                    <Redirect to='/' />
                </div>
            )
        }

        return (
            <div>
                <div className="container-flex">
                    <div className="row pb-3 pt-3 border-bottom text-center"> 
                        <div className="col-xl-12">
                            <h4>View / Edit Personal Information</h4>   
                        </div>
                    </div>
                    <br />
                    <div className="row mt-3 text-dark text-center">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>Contact Information</b></u></h5>
                            <p>(when a reservation is made, the driveway owner will see your name and phone number)</p>
                        </div>
                    </div>
                    <PersonalInfoRow
                        header="Name"
                        displayText={displayFullName}
                        id={"update_name"}
                        action={"/api/account/update/name"}
                        type={"text"}
                        inputId={"fullName"}
                        value={fullName}
                        onChange={onTextboxChangeName}
                        placeholder={"Name Input"}
                        onClick={updateName}
                        buttonText={"Submit"}
                    />
                    <PersonalInfoRow 
                        header="Email"
                        displayText={displayEmail}
                        id={"update_email"}
                        action={"/api/account/update/email"}
                        type={"email"}
                        inputId={"email"}
                        value={emailToPostRequest}
                        onChange={onTextboxChangeEmail}
                        placeholder={"Email Input"}
                        onClick={updateEmail}
                        buttonText={"Submit"}
                    />
                    <PersonalInfoRow 
                        header="Phone Number"
                        displayText={displayPhoneNumber}
                        id={"update_phone"}
                        action={"/api/account/update/phone"}
                        type={"number"}
                        inputId={"phone_number"}
                        value={phone_numberToPostRequest}
                        onChange={onTextboxChangePhone_Number}
                        placeholder={"Phone Number Input"}
                        onClick={updatePhone}
                        buttonText={"Submit"}
                    />
                    <hr />
                    <div className="row mt-3 text-center">
                        <div className="col-sm-12">
                        <h5 className="text-center"><u><b>Driveway Information</b></u></h5>
                        <p>(used to locate your driveway when active)</p>
                        </div>
                    </div>
                    {/* rows of personal information with input to pass to post request functions */}
                    <PersonalInfoRow 
                        header="Address"
                        displayText={displayAddress}
                        id={"update_address"}
                        action={"/api/account/update/address"}
                        type={"text"}
                        inputId={"address"}
                        value={addressToPostRequest}
                        onChange={onTextboxChangeAddress}
                        placeholder={"Address Input"}
                        onClick={updateAddress}
                        buttonText={"Submit"}
                    />
                    <PersonalInfoRow 
                        header="City"
                        displayText={displayCity}
                        id={"update_city"}
                        action={"/api/account/update/city"}
                        type={"text"}
                        inputId={"city"}
                        value={cityToPostRequest}
                        onChange={onTextboxChangeCity}
                        placeholder={"City Input"}
                        onClick={updateCity}
                        buttonText={"Submit"}
                    />
                    <PersonalInfoRow 
                        header="State"
                        displayText={displayState}
                        id={"update_state"}
                        action={"/api/account/update/state"}
                        type={"text"}
                        inputId={"state"}
                        value={stateToPostRequest}
                        onChange={onTextboxChangeState}
                        placeholder={"State Input"}
                        onClick={updateState}
                        buttonText={"Submit"}
                    />
                    <PersonalInfoRow 
                        header="Zipcode"
                        displayText={displayZipcode}
                        id={"update_zipcode"}
                        action={"/api/account/update/zipcode"}
                        type={"text"}
                        inputId={"zipcode"}
                        value={zipcodeToPostRequest}
                        onChange={onTextboxChangeZipcode}
                        placeholder={"Zipcode Input"}
                        onClick={updateZipcode}
                        buttonText={"Submit"}
                    />       
                    {/* verify address, sends to geocoder to get long lat and store it on the database */}
                    <hr />
                    <div className="row mt-3 text-dark text-center pt-2">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>Address Verification</b></u></h5>
                            <p>(once verified, your address is setup to display, please click "verify" if you have altered your address)</p>
                        </div>
                    </div>
                    <div className="row mt-2 text-dark text-center justify-content-center pb-2 mb-3">
                        <div className="col-sm-2 col-xs-6">
                            <h6 className="border-right">Full Address</h6>
                        </div>
                        <div className="col-sm-3 col-xs-6 border-right">
                            {displayFullAddress}
                        </div>
                        <div className="col-sm-2 col-xs-6 flex">
                            <button className="btn btn-sm btn-primary " type="submit" onClick={verifyAddress}>
                                Verify
                            </button>
                        </div>
                        {/* if successful verification, display message */}
                        <div className="col-sm-2 col-xs-6">
                            {verifyMessage}
                        </div>
                    </div>   
                </div>
            </div>
        );
    }
}

export default Dashboard;