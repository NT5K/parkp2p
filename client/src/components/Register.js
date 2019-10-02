import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage } from '../utils/storage'
import { Redirect } from 'react-router-dom'


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

}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            token: '',
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
        };

        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp() {
        // Grab state
        const { signUpEmail, signUpPassword } = this.state;
        this.setState({ isLoading: true });
        // Post request to backend
        fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputEmail: signUpEmail,
                inputPassword: signUpPassword,
            }),
            // json response
        }).then(res => res.json())
            // if json.success, set signUpError to json.msg which is "congrats"
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signUpEmail: '',
                        signUpPassword: '',
                    });
                    // TODO: set msg here maybe will fix duplicate email
                } else {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

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

    // if registered successfully redirect to login page
    redirectToLogin = () => {
        if (this.state.token) {
            return <Redirect to='/' />
        }
    }


    render() {
        const {
            isLoading,
            token,
            signUpEmail,
            signUpPassword,
            signUpError,
        } = this.state;
        console.log(signUpError)
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        if (signUpError === "congrats")
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )

        if (!token) {
            return (
                <div className="container-fluid pb-5 pt-5" style={styles.backgroundImage}>

                    <div className="row justify-content-center">
                        <div style={styles.maxWidth} className="border border-dark rounded pt-2 pr-4 pb-2 pl-4 bg-white">
                            <form className="form-signup" method="post" action="/api/account/signup">
                                <div className="text-center mb-4">
                                    <h1>PARK P2P</h1>
                                    <h4>REGISTER</h4>
                                </div>
                                {
                                    (signUpError) ? (
                                        <p>{signUpError}</p>
                                    ) : (null)
                                }
                                <div className="form-label-group mb-3">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        name="inputEmail"
                                        value={signUpEmail}
                                        onChange={this.onTextboxChangeSignUpEmail}
                                        className="form-control"
                                        placeholder="Email address"
                                        required
                                        autoFocus />
                                </div>

                                <div className="form-label-group mb-3">
                                    <input
                                        type="password"
                                        id="inputPassword"
                                        name="inputPassword"
                                        value={signUpPassword}
                                        onChange={this.onTextboxChangeSignUpPassword}
                                        className="form-control"
                                        placeholder="Password"
                                        required />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSignUp}>
                                    Create Account
                                </button>
                                <div className="text-center mt-5 mb-3">
                                    <a href="/login">Account Login</a>
                                    <p className="text-muted">&copy; 2019 PARK P2P</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {this.redirectToLogin()}
            </div>
        );
    }
}

export default Home;
