import React from 'react'


const styles = {
  backgroundImage: {
    backgroundImage: "url('../../images/noSpots.jpg' )",
    height: "100%",
    width: "100%",
    backgroundPosition: "50% 42%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: ""
    // backgroundRepeat: "bottom"
  },
  textShadow: {
    textShadow: "2px 2px 2px black",
    WebkitTextStroke: "1px black",
    fontFamily: 'Ubuntu'
    // textShadow: "-3px - 3px 0 #000",
    // textShadow: "3px - 3px 0 #000",
    // textShadow: "-3px 3px 0 #000",
    // textShadow: "3px 3px 0 #000"
  },
  boxShadow: {
    boxShadow: "1px 1px 2px black"
  },
  zIndex: {
    zIndex: 999,
    position: "absolute",
    overflow: "visible",
    width: "100vw"
  },
  paddingtop: {
    paddingTop: "200px"
  }
}

function StoreFront() {
    
        return (
          <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-1 pb-2">
              <a className="navbar-brand mr-5" href="/">PARK P2P</a>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link pr-3" href="/login">Login</a>
                  </li>
                  <li className="nav-item mr-3">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                </ul>
              </div>
            </nav>    

            <main role="main">

              <section className="jumbotron text-center" style={styles.backgroundImage}>
                <div className="container text-light">
                  <h1 className="jumbotron-heading" style={styles.textShadow}>PARK P2P</h1>
                  <h2 style={styles.textShadow}>YOUR DRIVEWAY IS NOW A PARKING LOT.</h2>
                  {/* <p className="lead text-muted">
                    Earn cash by letting others use your driveway!
                  </p> */}
                  <p>
                    <a href="#bottomlink" className="btn btn-primary my-2 m-2" style={styles.boxShadow}>Learn More</a>
                    <a href="/login" className="btn btn-primary my-2 m-2" style={styles.boxShadow}>Register Now</a>
                  </p>
                </div>
              </section>

              <div className="album py-5 bg-light">
                <div className="container">

                  <div className="row text-center">
                    <div className="col-md-4">
                      <div className="card mb-4 shadow-sm">
                        <img className="card-img-top" width="100%" height="225" src="../../images/drivewaydash.png" alt="dash" />
                        <div className="card-body">
                          <p className="card-text">Your driveway, your rules. As the owner of the driveway, you complete control every detail about your new parking lot.</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small className="text-muted">9 mins</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="card mb-4 shadow-sm">
                        <img className="card-img-top" width="100%" height="225" src="../../images/littlemap.png" alt="map" />
                        <div className="card-body">
                          <p className="card-text">No luck finding a spot on the street? No worries, just check the app. There are always spots available close by!</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small className="text-muted">9 mins</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-4 shadow-sm">
                        <img className="card-img-top" width="100%" height="225" src="../../images/reservenow.png" alt="reservation" />
                        <div className="card-body">
                          <p className="card-text">When activated, your driveway is now a available to the public to reserve a spot for a time and a date.</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small className="text-muted">9 mins</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </main>

            <footer className="text-muted" id="bottomlink">
              <div className="container">
                <p className="float-right">
                  Made by: Travis | Kavaughn | Nick
                </p>
                <p> ParkP2P &copy; 2019</p>
              </div>
            </footer>
          </div>
        )
    
}

export default StoreFront;