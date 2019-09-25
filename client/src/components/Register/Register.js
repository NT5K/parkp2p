import React, {Component} from "react";
const styles = {
    maxWidth: {
        maxWidth: 400,
        marginTop:50
    }
}

class Register extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         customers: []
    //     };
    // }
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch('user/register') // or whatever URL you want
            .then((response) => response.json())
            .then((response) => console.log("this is response",response))
            .then((posts) => this.setState({
                posts: posts
            }))
    }
    // componentDidMount() {
    //     fetch('/api/customers')
    //         .then(res => res.json())
    //         .then(customers => this.setState({ customers }, () => console.log('Customers fetched...', customers)));
    // }

    render() {
        return (
            <div className="container-fluid" >
            <div>{this.state.posts}</div>
                <div className="row justify-content-center">
                    <div style={styles.maxWidth} className="border border-dark rounded pt-2 pr-4 pb-2 pl-4">
                        <form className="form-signup" method="post" action="/api/account/signup">
                            <div className="text-center mb-4">
                                <h1>PARK P2P</h1>
                                <h4>REGISTER</h4>
                            </div>

                                <div className="form-label-group mb-2">
                                    <input type="email" id="inputEmail" name="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                                </div>

                                <div className="form-label-group mb-2">
                                    <input type="text" id="inputUsername" name="inputUsername" className="form-control" placeholder="Username" required autoFocus />
                                </div>

                                <div className="form-label-group mb-2">
                                    <input type="password" id="inputPassword" name="inputPassword" className="form-control" placeholder="Password" required />
                                </div>

                                <div className="form-label-group mb-2">
                                    <input type="password" id="passwordMatch" name="passwordMatch"className="form-control" placeholder="Re-enter Password" required />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block" type="submit">Create Account</button>
                                <p className="mt-5 mb-3 text-muted text-center">&copy; 2019 PARK P2P</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;