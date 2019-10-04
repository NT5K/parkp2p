import React, { Component } from 'react';
import GoogleMap from '../components/GoogleMap';
import NavBar from './../components/NavBar';


const styles = {
    overflow: "auto"
}

class Main extends Component {
    render() {
        return (
            <div style={styles}>
                <NavBar />
                <GoogleMap />
            </div>
        );
    }
}

export default Main;