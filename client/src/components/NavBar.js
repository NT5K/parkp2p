import React, { Component } from 'react';
import { getFromStorage } from '../utils/storage'
import 'whatwg-fetch';
import store from 'store'
import { Redirect } from 'react-router-dom'

// const key = store.get('park_p2p')

const styles = {

    shadow: {
        boxShadow: "1px 1px 1px #9E9E9E"
    },
    zIndex: {
        zIndex: 1
    },
    zIndexCollapse: {
        zIndex: 2
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            error: '',
            loggedOut: false
        }

        this.logout = this.logout.bind(this);
    }

    // fetch('https://example.com/delete-item/', {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify({ id: '5bdcdfa40f0a326f858feae0' })
    // })
    //     .then(res => res.text()) // OR res.json()
    //     .then(res => console.log(res))
    // if token in local storage, set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    // redirectToLogin = () => {
    //     if (this.state.token) {
    //         return <Redirect to='/login' />
    //     }
    // }

    logout() {
        this.setState({
            isLoading: true,
        });
        const obj = getFromStorage('park_p2p');
        // console.log("~~~~~~~~~" , obj.token)
        if (obj && obj.token) {
            const { token } = obj;
            console.log("TOKEN", token)
            this.setState({ error: "good1" })

            // Verify token
            fetch('/api/account/logout/' + token, {
                method: 'DELETE',
                body: JSON.stringify(token)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        store.remove('park_p2p')
                        this.setState({
                            token: '',
                            isLoading: false,
                            error: "successful logout",
                            loggedOut: true
                        });

                    } else {
                        this.setState({
                            isLoading: false,
                            error: "failed to logout"
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }



    render() {
        // const { token } = this.state
        // const { redirect } = this
        const { loggedOut } = this.state

        // return (
        //     <div>
        //         <p>Account: {this.state.token}</p>
        //         <button onClick={this.logout}>Logout</button>
        //         <p>Error: {this.state.error}</p>
        //     </div>
        // );
        if (loggedOut) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light pt-1 pb-1" style={{ ...styles.shadow, ...styles.zIndex }}>
                <a className="navbar-brand mr-5" href="/">PARK P2P</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder='Spots in "Cleveland, Oh"' aria-label="Search" style={styles.shadow} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={styles.shadow}>Search</button>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item border-right border-left">
                            <a className="nav-link text-primary" href="http://localhost:3000/">Share your driveway! <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item border-right">
                            <a className="nav-link" href="http://localhost:3000/">Dashboard</a>
                        </li>
                        <li className="nav-item border-right">
                            <a className="nav-link" href="http://localhost:3000/">Help</a>
                        </li>
                        <li className="nav-item border-right">
                            <p onClick={this.logout} >Logout</p>
                            {/* <button onClick={this.logout}><a href="/login">Logout</a></button> */}
                            {/* <button onClick={this.logout}>Logout</button> */}
                        </li>

                    </ul>

                </div>
            </nav>
        )


    }

}




// function NavBar(props) {

//     return ('
//         <nav className="navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3" style={{...styles.shadow, ...styles.zIndex}}>
//             <a className="navbar-brand mr-5" href="/">PARK P2P</a>

//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <form className="form-inline my-2 my-lg-0">
//                     <input className="form-control mr-sm-2" type="search" placeholder='Spots in "Cleveland, Oh"' aria-label="Search" style={styles.shadow}/>
//                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={styles.shadow}>Search</button>
//                 </form>
//                 <ul className="navbar-nav ml-auto">
//                     <li className="nav-item border-right border-left">
//                         <a className="nav-link text-primary" href="#">Share your driveway! <span className="sr-only">(current)</span></a>
//                     </li>
//                     <li className="nav-item border-right">
//                         <a className="nav-link" href="#">Dashboard</a>
//                     </li>
//                     <li className="nav-item border-right">
//                         <a className="nav-link" href="#">Help</a>
//                     </li>
//                     <li className="nav-item border-right">
//                         <a className="nav-link" href="/login">Logout</a>
//                     </li>

//                 </ul>

//             </div>
//             </nav>
//     )
// }

export default NavBar;