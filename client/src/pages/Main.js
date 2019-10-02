import React, { Component } from 'react';
import GoogleMap from '../components/GoogleMap';
import NavBar from './../components/NavBar';
import ExampleData from '../components/ExampleData';


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