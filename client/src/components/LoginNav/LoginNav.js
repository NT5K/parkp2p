import React from 'react';

const styles = {
    shadow: {
        boxShadow: "1px 1px 1px #9E9E9E"
    }
}

function LoginNav(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3" style={styles.shadow}>
            <a className="navbar-brand mr-5" href="/">PARK P2P</a>

            

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               
                <ul className="navbar-nav ml-auto">
                
                    <li className="nav-item border-right">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item border-right">
                        <a className="nav-link" href="/register">Register</a>
                    </li>

                </ul>

            </div>
        </nav>
    )
}

export default LoginNav;