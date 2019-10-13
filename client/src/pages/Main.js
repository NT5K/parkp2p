import React, { Component } from 'react';
import NavBar from './../components/NavBar';


const styles = {
    overflow: "auto",
    // height: "100vh"
}

class Main extends Component {
    render() {
        return (
            <div style={styles}>
                <NavBar />
            </div>
        );
    }
}

export default Main;