import React, { Component } from 'react';
<<<<<<< HEAD
import Container from './../components/Container/Container';
import GoogleMap from './../components/GoogleMap/GoogleMap';
import NavBar from './../components/NavBar/NavBar';

=======
import GoogleMap from '../components/GoogleMap';
import NavBar from './../components/NavBar';
import ExampleData from '../components/ExampleData';
>>>>>>> 97348f5548a2e53c79fc1c6bdf1b156004867339


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