import React from 'react';

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

function NavBar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3" style={{...styles.shadow, ...styles.zIndex}}>
            <a className="navbar-brand mr-5" href="/">PARK P2P</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder='Spots in "Cleveland, Oh"' aria-label="Search" style={styles.shadow}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={styles.shadow}>Search</button>
                </form>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item border-right border-left">
                        <a className="nav-link text-primary" href="#">Share your driveway! <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item border-right">
                        <a className="nav-link" href="#">Dashboard</a>
                    </li>
                    <li className="nav-item border-right">
                        <a className="nav-link" href="#">Help</a>
                    </li>
                    <li className="nav-item border-right">
                        <a className="nav-link" href="/login">Logout</a>
                    </li>
                   
                </ul>
               
            </div>
            </nav>
    )
}

export default NavBar;