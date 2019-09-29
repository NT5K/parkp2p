import React, { Component } from 'react';
import Container from './../components/Container/Container';
import GoogleMap from './../components/GoogleMap/GoogleMap';
import NavBar from './../components/NavBar/NavBar';



class Main extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <GoogleMap />
            </div>
        );
    }
}

export default Main;