import React, { Component } from 'react';

import Register from './../components/Register/Register'
import RegisterTwo from './../components/Register2/Register2'
import LoginNav from './../components/LoginNav/LoginNav'

const styles = {
    backgroundImage: {
        backgroundImage: "url('http://www.rantlifestyle.com/wp-content/uploads/2014/01/No.-5-Parking-Spots-Arent-Like-Gold-Everywhere1.jpg')",
        height: "100vh",
        backgroundRepeat: "initial"
    },

}

class RegisterPage extends Component {
   
    render() {
        return (
            <div style={styles.backgroundImage}>
                {/* <LoginNav/> */}
                <RegisterTwo />
            </div>
        );
    }
}

export default RegisterPage;