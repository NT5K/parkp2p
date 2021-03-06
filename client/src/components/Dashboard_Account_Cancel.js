import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import store from 'store'
import 'whatwg-fetch';
import PersonalInfoRow from './PersonalInfoRow'

class CancelAccount extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            displayEmail: '',
            passwordToPostRequest: ''
        };

        this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
     }
    // grab state based on local storage token #
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
            // set state for email
            this.setState({
                displayEmail: Email,
            })
        // }, () => console.log("user array", this.state.user, "this users token", this.state.token))
        }, () => console.log("success"))
    }

    // when input changes, set state for post request password
    onTextboxChangePassword(event) {
        this.setState({
            passwordToPostRequest: event.target.value
        });
    }

    // delete row on database post request
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
        
        // if no local storage token, redirect to login
        if (!token) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }

        return (
            <div>
                <div className="container-flex">
                    <div className="row pb-3 pt-3 border-bottom text-center">
                        <div className="col-xl-12">
                            <h4>Cancel Account</h4>
                        </div>
                    </div>
                    <br />
                    <div className="row mt-3 text-dark text-center">
                        <div className="col-sm-12">
                            <h5 className="text-center"><u><b>To cancel, please provide correct password for this account:</b></u></h5>
                        </div>
                    </div>
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
        );
    }
}

export default CancelAccount;