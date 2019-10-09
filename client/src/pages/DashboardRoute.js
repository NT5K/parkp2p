import React, { Component } from 'react'

import Toolbar from './../components/Toolbar/Toolbar'
import SideDrawer from './../components/SideDrawer/SideDrawer'
import Backdrop from './../components/Backdrop/Backdrop'

class App extends Component {
    state = {
        sideDrawerOpen: false,
    }

    drawerToggleClickHandler = () => {
        this.setState(prevState => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        })
    }

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false })
    }

    render() {
        let backdrop
        let sideDrawer

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
            sideDrawer = <SideDrawer />
        }
        return (
            <div style={{ height: '100%' }}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                {sideDrawer}
                {backdrop}
                <main style={{ marginTop: '64px' }}>
                    <p>This is the page content!</p>
                </main>
            </div>
        )
    }
}

export default App

// import React, { Component } from 'react';

// import Dashboard_Nav_Top from '../components/Dashboard_Nav_Top'
// import Dashboard_Nav_Side from '../components/Dashboard_Nav_Side'

// import Profits from '../components/Dashboard/Dashboard'
// import Account from "./../components/Dashboard_Account"
// import Toolbar from './../components/Toolbar/Toolbar'
// import SideDrawer from './../components/SideDrawer/SideDrawer'
// import Backdrop from './../components/Backdrop/Backdrop'
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import sideDrawer from './../components/SideDrawer/SideDrawer';

// class Dashboard extends Component {
//     state = {
//         sideDrawerOpen: false,

//     }
//     drawerToggleClickHandler = (prevState) => {
//         this.setState(() => {
//             return {sideDrawerOpen: !prevState.sideDrawerOpen}
//         })
//     }

//     backdropClickHandler = () => {
//         this.setState({
//             sideDrawerOpen: false
//         })
//     }

//     render() {
//         let sideDrawer;
//         let backdrop
//         if (this.state.sideDrawerOpen) {
//             sideDrawer = <SideDrawer />
//             backdrop = <Backdrop click = {this.backdropClickHandler} /> 
//         }
//         return (
//             <div style={{height: '100vh'}}>
//                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
//                {sideDrawer}
//                {backdrop}
//                <main style={{marginTop: '64px'}}>
//                 <p>this is the page content</p>
//                </main>
//            </div>
            
//         );
//     }
// }

// export default Dashboard;