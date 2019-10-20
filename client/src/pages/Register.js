import React, { Component } from 'react';
import Register from '../components/Register'

const styles = {
    backgroundImage: {
        backgroundImage: "url('../images/noSpots.jpg')",
        height: "100vh",
        backgroundRepeat: "initial"
    }
}

class RegisterPage extends Component {
    render() {
        return (
            <div style={styles.backgroundImage}>
             
                <Register />
            </div>
        );
    }
}

export default RegisterPage;