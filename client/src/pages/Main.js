import React, { Component } from 'react';
import GoogleMap from '../components/GoogleMap';
import NavBar from './../components/NavBar';


const styles = {
    overflow: "auto"
}
const CollapseStyle = {
    content: {
        position: "relative"
    },

    collapseExample: {
        position: "absolute",
        zIndex: 1
    }
}

class Main extends Component {
    render() {
        return (
            <div style={styles}>
                <NavBar style={CollapseStyle.collapseExample} />
                <GoogleMap/>
            </div>
        );
    }
}

export default Main;