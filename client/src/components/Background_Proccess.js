import React, { Component }  from "react";
import { Link } from 'react-router-dom'
import { slide as Menu } from "react-burger-menu";
import store from 'store'
import { getFromStorage } from '../utils/storage'

class BackgroundProcess extends Component {

    constructor(props) {
        super(props);

        this.state = {
        time: new Date()
        };

    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: new Date() }), 1000);
    
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
    
    const { time } = this.state

    console.log(time.getMinutes() === 59)
    
    return null
    }



};

export default BackgroundProcess
