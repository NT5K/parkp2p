import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store'
import 'whatwg-fetch';
import DashboardNav from './Dashboard_Nav_Top'
import DashboardNavSide from './Dashboard_Nav_Side'
import PersonalInfoRow from './PersonalInfoRow'

class CancelAccount extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
            displayEmail: '',
            passwordToPostRequest: ''
        };

        this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);

        this.deleteUser = this.deleteUser.bind(this);

        // this.changeButtonToAddOrUpdateEmail = this.changeButtonToAddOrUpdateEmail.bind(this);

        // this.checkIfEmailIsOnDatabase = this.checkIfEmailIsOnDatabase.bind(this);
     }

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
            const { Email } = user[0]
            this.setState({
                user: user[0],
                displayEmail: Email,
            })
        }, () => console.log("user array", this.state.user, "this users token", this.state.token))
    }

    onTextboxChangePassword(event) {
        this.setState({
            passwordToPostRequest: event.target.value
        });
    }

    deleteUser(event) {
        event.preventDefault()
        const { token, passwordToPostRequest } = this.state
        console.log(token, passwordToPostRequest)
        fetch('/api/account/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                passwordToPostRequest
            })
        })  
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                store.remove('park_p2p')
                this.setState({
                    token: '',
                    error: "successful delete",
                });

            } else {
                this.setState({
                    error: "failed to delete"
                });
            }
        });
    }

    render() {
        const { displayEmail, passwordToPostRequest, token } = this.state
        const { onTextboxChangePassword, deleteUser } = this
        
        if (!token) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }

        return (
            <div>
                <DashboardNav />
                <div style={{ height: "100vh" }} className="row">
                    <DashboardNavSide />
                    <div className="col-xl-10 no-gutter text-center bg-white">
                        <div className="row pb-3 pt-3 border-bottom">
                            <div className="col-xl-12">
                                <h4>Cancel Account</h4>
                            </div>
                        </div>
                        <h5 className="text-left pt-3 pb-2">To cancel, please provide correct password for this account:</h5>

                        <PersonalInfoRow
                            header="Account"
                            displayText={displayEmail}
                            id={"delete_user"}
                            action={"/api/account/delete/"}
                            type={"text"}
                            inputId={"delete_user"}
                            value={passwordToPostRequest}
                            onChange={onTextboxChangePassword}
                            placeholder={"password goes here"}
                            onClick={deleteUser}
                            buttonText={"Delete Account"}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CancelAccount;