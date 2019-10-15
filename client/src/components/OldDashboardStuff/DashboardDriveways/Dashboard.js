import React, {Component} from "react";
const formStyle = {
    width: '600px',
    marginTop: '50px',
    backgroundColor : 'white',
    border : '1px solid #B8B8B8'
}

const sidebarStyle = {
    height : '840px',
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

const infoContainerTags = {
    fontSize : '20px'
}

const headerStyle = {
    backgroundColor: 'black', 
    height : '60px',
    boxShadow: '5px 8px 8px -2px gray'
}

const incomeStatement = {
    height : '200px', 
    width : '300px',
    backgroundColor : 'white',
    margin : 'auto', 
    marginTop : '30px',
    borderStyle : 'solid',
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
                                    <b style={sidebarContent}>Dashboard</b> 
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
                                    <b style={sidebarContent}>Driveways</b> <span style={sidebarCurrent}>(current)</span>
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
                        <div className="col-xl-12 no-gutter text-center">
                            <div className="container-fluid" >
                                <div className="row justify-content-center">
                                    <div style={formStyle} className="rounded pt-2 pr-4 pb-2 pl-4">
                                        <form className="form-signin" method="post" action="/api/account/signin">
                                            
                                            <div className="row">
                                            
                                                <div className="col-xl-2"></div>
                                                <div className="col-xl-8 text-center">
                                                    <div className="text-center mb-4">
                                                        <h3>Driveway Info</h3>
                                                    </div>
                                                </div>

                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>State</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>Ohio</span>
                                            </div>
                                            <div className="col-xl-2"></div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>City</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>Columbus</span>
                                            </div>
                                            <div className="col-xl-2"></div>
                                            </div>

                                            <hr></hr>
                                            
                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>Street</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>2035 Stewie Park Rd</span>
                                            </div>
                                            <div className="col-xl-2"></div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>Zipcode</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>45701</span>
                                            </div>
                                            <div className="col-xl-2"></div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>Hourly</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>$0.50</span>
                                            </div>
                                            <div className="col-xl-2 text-center">
                                            <a href="" style={infoContainerTags}>edit</a>   
                                            </div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>Daily</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>$10</span>
                                            </div>
                                            <div className="col-xl-2 text-center">
                                            <a href="" style={infoContainerTags}>edit</a>   
                                            </div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 href="" style={infoContainerTags}>Weekly</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>$50</span>
                                            </div>
                                            <div className="col-xl-2 text-center">
                                            <a href="" style={infoContainerTags}>edit</a>   
                                            </div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>Monthly</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>$200</span>
                                            </div>
                                            <div className="col-xl-2 text-center">
                                            <a href="" style={infoContainerTags}>edit</a>   
                                            </div>
                                            </div>

                                            <hr></hr>

                                            <div className="row">
                                            <div className="col-xl-2">
                                            <h5 style={infoContainerTags}>Income</h5>   
                                            </div>
                                            <div className="col-xl-8 text-center">
                                            <span>$1560</span>
                                            </div>
                                            <div className="col-xl-2 text-center"></div>
                                            </div>



                                                <p className="mt-5 mb-3 text-muted text-center">&copy; 2019 PARK P2P</p>
                                        </form>
                                    </div>
                                </div>
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