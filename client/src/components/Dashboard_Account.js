import React, {Component} from "react";
import store from 'store'
import 'whatwg-fetch';
import DashboardNav from './Dashboard_Nav_Top'
import DashboardNavSide from './Dashboard_Nav_Side'
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
            displayZipcode: ''
        };

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

        this.changeButtonToAddOrUpdateEmail = this.changeButtonToAddOrUpdateEmail.bind(this);
        this.changeButtonToAddOrUpdateName = this.changeButtonToAddOrUpdateName.bind(this);
        this.changeButtonToAddOrUpdatePhone_Number = this.changeButtonToAddOrUpdatePhone_Number.bind(this);
        this.changeButtonToAddOrUpdateAddress = this.changeButtonToAddOrUpdateAddress.bind(this);
        this.changeButtonToAddOrUpdateCity = this.changeButtonToAddOrUpdatePhone_Number.bind(this);
        this.changeButtonToAddOrUpdateState = this.changeButtonToAddOrUpdatePhone_Number.bind(this);
        this.changeButtonToAddOrUpdateZipcode = this.changeButtonToAddOrUpdatePhone_Number.bind(this);

        this.checkIfEmailIsOnDatabase = this.checkIfEmailIsOnDatabase.bind(this);
        this.checkIfNameIsOnDatabase = this.checkIfNameIsOnDatabase.bind(this);
        this.checkIfPhone_NumberIsOnDatabase = this.checkIfPhone_NumberIsOnDatabase.bind(this);
        this.checkIfAddressIsOnDatabase = this.checkIfAddressIsOnDatabase.bind(this);
        this.checkIfCityIsOnDatabase = this.checkIfCityIsOnDatabase.bind(this);
        this.checkIfStateIsOnDatabase = this.checkIfStateIsOnDatabase.bind(this);
        this.checkIfZipcodeIsOnDatabase = this.checkIfPhone_NumberIsOnDatabase.bind(this);
    }

    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
        token: store.get('park_p2p').token
        })
    }

    // gets info based on token
    componentDidMount() {
        fetch('/api/account/personal/' + this.state.token)
        .then(res => res.json())
        .then(user => {
            const { Name, Email, Phone_Number , Address, City, Zipcode, State} = user[0] 
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
        }, () => console.log("user array", this.state.user, "this users token", this.state.token))
    }

    // passes input values to state
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
                const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                this.setState({
                    displayAddress: addressToPostRequest,
                    displayFullAddress: addressToPostRequest + ", " + displayCity + ", " + displayState + " " + displayZipcode
                });
            }
        });
    }
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
                const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                this.setState({
                    displayCity: cityToPostRequest,
                    displayFullAddress: displayAddress + ", " + cityToPostRequest + ", " + displayState + " " + displayZipcode
                });
            }
        });
    }
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
                const { displayCity, displayState, displayZipcode, displayAddress } = this.state
                this.setState({
                    displayState: stateToPostRequest,
                    displayFullAddress: displayAddress + ", " + displayCity + ", " + stateToPostRequest + " " + displayZipcode
                });
            }
        });
    }
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
            const { displayCity, displayState, displayZipcode, displayAddress } = this.state
            if (json.success) {
                this.setState({
                    displayZipcode: zipcodeToPostRequest,
                    displayFullAddress: displayAddress + ", " + displayCity + ", " + displayState + " " + zipcodeToPostRequest
                });
            }
        });
    }

    // decides placeholder and button text
    checkIfNameIsOnDatabase() {
        const { Name } = this.state.user
        return (Name ? "Update name" : "Add name")
    }
    checkIfEmailIsOnDatabase() {
        const { Email } = this.state.user
        return (Email ? "Update email address" : "Add email")
    }
    checkIfPhone_NumberIsOnDatabase() {
        const { Phone_Number } = this.state.user
        return (Phone_Number ? "Update phone number" : "Add phone number")
    }
    checkIfAddressIsOnDatabase() {
        const { Address } = this.state.user
        return (Address ? "Update address" : "Add address")
    }
    checkIfCityIsOnDatabase() {
        const { City } = this.state.user
        return (City ? "Update city" : "Add city")
    }
    checkIfStateIsOnDatabase() {
        const { State } = this.state.user
        return (State ? "Update state" : "Add state")
    }
    checkIfZipcodeIsOnDatabase() {
        const { Zipcode } = this.state.user
        return (Zipcode ? "Update zipcode" : "Add zipcode")
    }

    changeButtonToAddOrUpdateName() {
        const{ Name } = this.state.user
        return (Name ? "Submit" : "Add")
    }
    changeButtonToAddOrUpdateEmail() {
        const{ Email } = this.state.user
        return (Email ? "Submit" : "Add")
    }
    changeButtonToAddOrUpdatePhone_Number() {
        const{ Phone_Number } = this.state.user
        return (Phone_Number ? "Submit" : "Add")
    }
    changeButtonToAddOrUpdateAddress() {
        const{ Address } = this.state.user
        return (Address ? "Submit" : "Add")
    }
    changeButtonToAddOrUpdateCity() {
        const{ City } = this.state.user
        return (City ? "Submit" : "Add")
    }
    changeButtonToAddOrUpdateState() {
        const{ State } = this.state.user
        return (State ? "Submit" : "Add")
    }
    changeButtonToAddOrUpdateZipcode() {
        const{ Zipcode } = this.state.user
        return (Zipcode ? "Submit" : "Add")
    }

    render() {
        const { 
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
            displayZipcode
        } = this.state

        const { 
            onTextboxChangeEmail, 
            checkIfEmailIsOnDatabase,
            changeButtonToAddOrUpdateEmail,
            updateEmail, 

            onTextboxChangeName,
            checkIfNameIsOnDatabase,
            changeButtonToAddOrUpdateName,
            updateName,

            changeButtonToAddOrUpdatePhone_Number,
            onTextboxChangePhone_Number,
            checkIfPhone_NumberIsOnDatabase,
            updatePhone,

            changeButtonToAddOrUpdateAddress,
            onTextboxChangeAddress,
            checkIfAddressIsOnDatabase,
            updateAddress,

            changeButtonToAddOrUpdateCity,
            onTextboxChangeCity,
            checkIfCityIsOnDatabase,
            updateCity,

            changeButtonToAddOrUpdateState,
            onTextboxChangeState,
            checkIfStateIsOnDatabase,
            updateState,

            changeButtonToAddOrUpdateZipcode,
            onTextboxChangeZipcode,
            checkIfZipcodeIsOnDatabase,
            updateZipcode,


        } = this
        return (
            <div>
                <DashboardNav />
                <div style={{height: "100vh"}} className="row">
                    <DashboardNavSide />     
                    <div className="col-xl-10 no-gutter text-center bg-white">
                        <div className="row pb-3 pt-3 border-bottom"> 
                            <div className="col-xl-12">
                                <h4>View / Edit Personal Information</h4>   
                            </div>
                        </div>
                        <h5 className="text-left pt-3 pb-2">Contact Information:</h5>
                        <PersonalInfoRow
                            header="Name"
                            displayText={displayFullName}
                            id={"update_name"}
                            action={"/api/account/update/name"}
                            type={"text"}
                            inputId={"fullName"}
                            value={fullName}
                            onChange={onTextboxChangeName}
                            placeholder={checkIfNameIsOnDatabase()}
                            onClick={updateName}
                            buttonText={changeButtonToAddOrUpdateName()}
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
                            placeholder={checkIfEmailIsOnDatabase()}
                            onClick={updateEmail}
                            buttonText={changeButtonToAddOrUpdateEmail()}
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
                            placeholder={checkIfPhone_NumberIsOnDatabase()}
                            onClick={updatePhone}
                            buttonText={changeButtonToAddOrUpdatePhone_Number()}
                        />

                        <h5 className="text-left pt-3 pb-2">Driveway Information:</h5>
                        {/* <h6 className="text-left text-secondary">In order to utilize your driveway, address must first be verified*</h6> */}

                        <PersonalInfoRow 
                            header="Address"
                            displayText={displayAddress}
                            id={"update_address"}
                            action={"/api/account/update/address"}
                            type={"text"}
                            inputId={"address"}
                            value={addressToPostRequest}
                            onChange={onTextboxChangeAddress}
                            placeholder={checkIfAddressIsOnDatabase()}
                            onClick={updateAddress}
                            buttonText={changeButtonToAddOrUpdateAddress()}
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
                            placeholder={checkIfCityIsOnDatabase()}
                            onClick={updateCity}
                            buttonText={changeButtonToAddOrUpdateCity()}
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
                            placeholder={checkIfStateIsOnDatabase()}
                            onClick={updateState}
                            buttonText={changeButtonToAddOrUpdateState()}
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
                            placeholder={checkIfZipcodeIsOnDatabase()}
                            onClick={updateZipcode}
                            buttonText={changeButtonToAddOrUpdateZipcode()}
                        />
                        <div className="row mt-3 text-dark text-center">
                            <div className="col-sm-3">
                                <h6 className="border-right">Full Address</h6>
                            </div>
                            <div className="col-sm-4">
                                <h6 className="text-center">{displayFullAddress}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;