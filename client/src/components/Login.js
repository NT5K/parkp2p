import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/storage'
import { Redirect } from 'react-router-dom'
import store from 'store';

const styles = {
    maxWidth: {
        maxWidth: 400,
        marginTop: 50
    },
    backgroundImage: {
        backgroundImage: "url('../../images/noSpots.jpg')",
        height: "100vh",
        // backgroundRepeat: "initial"
    },
    shadow: {
        boxShadow: "1px 1px 1px black"
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            token: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
        };

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    // function for post request to login
    onSignIn(event) {
        event.preventDefault()
        // Grab state
        const { signInEmail, signInPassword } = this.state;
        this.setState({ isLoading: true });
        // Post request to backend
        fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputEmail: signInEmail,
                inputPassword: signInPassword
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                // if successful credentials
                if (json.success) {
                    // set local storage
                    setInStorage('park_p2p', { token: json.token[0] });
                    console.log(json.token)
                    // clear states and display message
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInPassword: '',
                        signInEmail: '',
                        token: json.token,
                    });
                    // display error message, loading state false
                } else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    // set states for email and password
    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }
    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }

    // check if token is valid on the database
    UNSAFE_componentDidMount() {
        const token = getFromStorage('park_p2p')
        if (token) {
            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isLoading: false,
                        })
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            })
        }
    }

    // if logged in successfully redirect to main page
    redirectToMain = () => {
        if (this.state.token) {
            return <Redirect to='/' />
        }
    }

    render() {
        const {
            isLoading,
            token,
            signInError,
            signInEmail,
            signInPassword
        } = this.state;

        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        if (token) {
            return (
                <div>
                    <Redirect to='/' />
                </div>
            );
        } else {
            return (
                <div className="container-fluid  pb-5 pt-5" style={styles.backgroundImage}>
                    <div className="row justify-content-center">
                        <div style={{...styles.maxWidth, ...styles.shadow}} className="border border-dark rounded pt-2 pr-4 pb-2 pl-4 bg-light">
                            <form className="form-signin" method="post" action="/api/account/signin">
                                <div className="text-center mb-4">
                                    <h1>PARK P2P</h1>
                                    <h4>LOGIN</h4>
                                </div>
                                {
                                    (signInError) ? (
                                        <p>{signInError}</p>
                                    ) : (null)
                                }

                                <div className="form-label-group mb-3">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        name="inputEmail"
                                        value={signInEmail}
                                        onChange={this.onTextboxChangeSignInEmail}
                                        className="form-control"
                                        placeholder="Email address"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="form-label-group mb-3">
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        name="inputPassword"
                                        value={signInPassword}
                                        onChange={this.onTextboxChangeSignInPassword}
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSignIn}>
                                    Login
                                </button>
                                <div className="text-center mt-5 mb-3">
                                    <a href="/register">Account Register</a>
                                    <p className="text-muted">&copy; 2019 PARK P2P</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;
