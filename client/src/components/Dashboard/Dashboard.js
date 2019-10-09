import React, {Component} from "react";
const styles = {
    maxWidth: {
        maxWidth: 400,
        marginTop:50
    }
}

const sidebarStyle = {
    height : '740px',
    color : 'black',
    
}

const siderbarBorder = {
    borderRight: '1px solid #B8B8B8'
}

const sidebarContent = {
    color : '#696969'
}

const sidebarCurrent = {
    color : '#DC143C'
}

const headerStyle = {
    backgroundColor: 'black', 
    height : '60px',
    boxShadow: '5px 8px 8px -2px gray'
}

const incomeStatementRevenue = {
    height : '200px', 
    width : '300px',
    backgroundColor : '#0099B7',
    margin : 'auto', 
    marginTop : '30px',
    borderStyle : 'solid',
    borderColor : '#B8B8B8',
    borderWidth : '1px'
}

const incomeStatementProfit = {
    height : '200px', 
    width : '300px',
    backgroundColor : 'white',
    margin : 'auto', 
    marginTop : '30px',
    borderStyle : 'solid',
    borderColor : '#B8B8B8',
    borderWidth : '1px'
}

const incomeStatementFees = {
    height : '200px', 
    width : '300px',
    backgroundColor : 'white',
    margin : 'auto', 
    marginTop : '30px',
    borderStyle : 'solid',
    borderColor : '#B8B8B8',
    borderWidth : '1px'
}

const setPrices = {
height : '200px', 
width : '300px',
backgroundColor : 'white',
margin : 'auto', 
marginTop : '30px',
borderStyle : 'solid',
borderWidth : '1px'
}

const addMargin = {
marginTop : '30px'
}

class Dashboard extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         customers: []
    //     };
    // }

    // componentDidMount() {
    //     fetch('/api/customers')
    //         .then(res => res.json())
    //         .then(customers => this.setState({ customers }, () => console.log('Customers fetched...', customers)));
    // }

    render() {
        return (
            <div className="container-fluid no-gutter" >
                <div className="row">
                    
                    <div style={headerStyle} className="col-xl-2 no-gutter"></div>

                    <div style={headerStyle} className="col-xl-10 no-gutter">
                        <h2 style={{color : 'white',marginTop : '10px'}} className="text-center">Dashboard</h2>
                    </div>
                    
                </div>

                <div style={sidebarStyle} className="row">
                    
                    
                    <nav style={siderbarBorder} class="col-xl-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/dashboard">
                                    <span data-feather="home"></span>
                                    <b style={sidebarContent}>Dashboard</b> <span style={sidebarCurrent}>(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/account">
                                    <span dataFeather="file"></span>
                                    <b style={sidebarContent}>Account</b>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/driveways">
                                    <span data-feather="shopping-cart"></span>
                                    <b style={sidebarContent}>Driveways</b>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/add-driveway">
                                    <span data-feather="users"></span>
                                    <b style={sidebarContent}>Add Driveway</b>
                                    </a>
                                </li>
                                
                                </ul>
                            </div>
                    </nav>
                    
                    
                    <div className="col-xl-10 no-gutter text-center">
                    
                    <div className="row">
                        <div className="col-xl-4 no-gutter text-center">
                            <div style={incomeStatementRevenue}>
                                    <h1>Revenue:</h1>
                                    <h1>$0</h1>
                                </div>
                            </div>

                            <div className="col-xl-4 no-gutter text-center">
                            <div style={incomeStatementProfit}>
                                    <h1>Profit:</h1>
                                    <h1>$0</h1>
                                </div>
                            </div>

                            <div className="col-xl-4 no-gutter text-center">
                            <div style={incomeStatementFees}>
                                    <h1>Fees:</h1>
                                    <h1>$0</h1>
                                </div>
                            </div>

                        </div>
                        
                        <div className="row">
                            <div className="col-xl-12 no-gutter text-center">
                                <div style={setPrices}>
                                    <h4>Set Prices</h4>
                                    <hr></hr>
                                    <h4>Revenue: $0</h4>
                                    <h4>Profit: $0</h4>
                                    <h4>Fees: $0</h4>
                                </div>
                            </div>
                        </div>

                    </div>    

                </div>

            </div>
        );
    }
}

export default Dashboard;