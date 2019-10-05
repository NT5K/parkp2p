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

const infoContainer = {
    width : '600px',
    height : '740px',
    color : '#696969',
    backgroundColor : 'white',
    margin : 'auto',
    borderRight : '1px solid #B8B8B8',
    borderLeft : '1px solid #B8B8B8'

}

const infoContainerHeader = {
    paddingTop : '10px',
    marginLeft : '30px'

}

const infoContainerPassword = {
}

const infoContainerTags = {
    marginLeft : '30px',
    fontSize : '20px',
    whiteSpace : 'no-wrap'
}

const infoContainerContent = {
    margin : 'auto'
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
                                    <b style={sidebarContent}>Account</b> <span style={sidebarCurrent}>(current)</span>
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
                    
                    
                    <div className="col-xl-10 no-gutter">
                    
                        <div className="row">
                            <div className="col-xl-12 no-gutter">
                                <div style={infoContainer}>    
                                    <div className="no-gutter">
                                        <div className="row">
                                            <div className="col-xl-12">
                                            <h3 style={infoContainerHeader}>Account Information</h3>   
                                            </div>
                                        </div>

                                        <hr></hr>

                                        <div className="row">
                                            <div className="col-xl-1">
                                            <h5 style={infoContainerTags}>Name</h5>   
                                            </div>
                                            <div className="col-xl-11 text-center">
                                            <span style={infoContainerContent}>KaVaughn Irons</span>
                                            </div>
                                        </div>

                                        <hr></hr>

                                        <div className="row">
                                            <div className="col-xl-1">
                                            <h5 style={infoContainerTags}>Email</h5>   
                                            </div>
                                            <div className="col-xl-11 text-center">
                                            <span style={infoContainerContent}>kavaughn@gmail.com</span>
                                            </div>
                                        </div>

                                        <hr></hr>

                                        <div className="row">
                                            <div className="col-xl-1">
                                            <h5 style={infoContainerTags}>Password</h5>   
                                            </div>
                                            <div className="col-xl-11 text-center">
                                            <span style={infoContainerPassword}>2025 Oakwood Grange</span>
                                            </div>
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