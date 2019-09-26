import React, {Component} from "react";
import { getFromStorage, setInStorage } from '../../utils/storage'

const styles = {
    maxWidth: {
        maxWidth: 400,
        marginTop:50
    }
}

class Login extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         customers: []
    //     };
    // }

    // componentDidMount() {
    //     fetch('/api/customers')
    //         .then(res => res.json())
    //         .then(customers => this.setState({ customers }, () => console.log('Customers fetched...', customers)));
    // }

    render() {
        return (
            <div className="container-fluid" >
                <div className="row justify-content-center">
                    <div style={styles.maxWidth} className="border border-dark rounded pt-2 pr-4 pb-2 pl-4">
                        <form className="form-signin" method="post" action="/api/account/signin">
                            <div className="text-center mb-4">
                                <h1>PARK P2P</h1>
                                <h4>LOGIN</h4>
                            </div>

                                <div className="form-label-group mb-2">
                                    <input type="email" id="inputEmail" name="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                </div>

                                <div className="form-label-group mb-2">
                                <input type="password" id="inputPassword" name="inputPassword" className="form-control" placeholder="Password" required />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                                <p className="mt-5 mb-3 text-muted text-center">&copy; 2019 PARK P2P</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;