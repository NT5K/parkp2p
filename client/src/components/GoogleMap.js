import React, { Component } from 'react';
import { Map, GoogleApiWrapper, /*InfoWindow,*/ Marker } from 'google-maps-react';
import ExampleData from './ExampleData';
import store from 'store'
// import './GoogleMap.css';
// import StreetView from './StreetView';
// require('dotenv').config()
// const styles = require('./GoogleMapStyles.json')

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapStyles: {
                width: "100%",
                height: "100%",
                float: "center"
            },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: '',
            Address: '',
            address: '',
            lat: 0,
            lng: 0,
            marker: [],
            token: '',
            personLoggedIn: {}
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    // set token state to token value
    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    async componentDidMount() {
        await fetch('/api/public/driveways')
        .then(res => res.json())
        .then(marker => 
            this.setState({ 
                marker,
                personLoggedIn: this.state.marker[0]
            }))
            
        .then(()=> { 
            //console.log(this.state.marker.findIndex(index => { console.log(index.ID); return index.ID === this.state.token; }), "RANDOM!!!")
            this.setState({
                selectedPlace: this.state.marker[this.state.marker.findIndex(index => { return index.ID === this.state.token; })]
            })})
        .then( () => console.log("successful markers data fetch"))
        // .then( () => console.log("this is the person logged in", this.state.marker))
        // .then( () => console.log("this is the person logged in", this.state.personLoggedIn.Description))
        .catch(err => console.log(err));
    }

    //if no place is selected or searched, it set the gps coordinates of where you are as the default center
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.Coords !== this.props.Coords) {
            let latLng = { lat: nextProps.Coords.lat1, lng: nextProps.Coords.Lng1 }
            this.setState({ selectedPlace: latLng })
        }
    }

    
//binds all the information from selected place to a location string
    onMarkerClick(locationString) {
        console.log("LOCATION STRING", locationString)
        this.setState({
            selectedPlace: locationString
        })
    }

    //closes the infowindow and sets state to false
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        let { marker /*personLoggedIn, selectedPlace*/} = this.state
        // console.log("selectedPlace",selectedPlace)
        // console.log("selectedPlace LENGTH", Object.keys(selectedPlace).length)
        // console.log("personLoggedIn", personLoggedIn)
        return (
            <div className="container-flex">
                <div style={{ position: "relative", height: "50vh", width: "100%" /*marginBottom: "3.5%"*/}} id="map">
                    
                    {/* map styles */}
                    <Map
                        centerAroundCurrentLocation={true}
                        google={this.props.google}
                        zoom={12}
                        style={this.state.mapStyles}
                        // initialCenter={{
                        //     lat: 41.4993, 
                        //     lng: -81.6944
                        // }}
                        center={this.state.selectedPlace}
                        fullscreenControl={false}
                        // streetViewControl={false}
                        mapTypeControl={false}
                        // styles={styles}
                    >
                        {/* Marker of your current location */}
                        <Marker
                            onClick={this.onMarkerClick}
                            address={'You are Here'}
                            // label={"X"}
                            // animation={2}
                            icon={{
                                // url: "http://maps.google.com/mapfiles/ms/icons/red.png"
                                // url: "https://img.icons8.com/plasticine/24/000000/map-pin.png"
                                // url: "https://img.icons8.com/ios-filled/100/000000/standing-man.png"
                                // url: "https://img.icons8.com/material-rounded/24/000000/standing-man.png"
                                // url: "https://img.icons8.com/nolan/32/000000/street-view.png"
                                url: "https://img.icons8.com/dusk/32/000000/street-view.png"
                            }}
                        />

                        {/* marker information from mysql */}
                        {marker.map(marker => {
                            if(marker.Active_State > 0 && marker.Spots > 0) {
                                return <Marker
                                    onClick={this.onMarkerClick}
                                    key={marker.ID}
                                    Address={marker.Address}
                                    City={marker.City}
                                    State={marker.State}
                                    Zipcode={marker.Zipcode}
                                    Description={marker.Description}
                                    Instructions={marker.Instructions}
                                    Hourly={marker.Hourly}
                                    Daily={marker.Daily}
                                    Weekly={marker.Weekly}
                                    Monthly={marker.Monthly}
                                    Spots={marker.Spots}
                                    ID={marker.ID}
                                    Name={marker.Name}
                                    Phone={marker.Phone_Number}

                                    // animation={1}
                                    position={{ lat: marker.Latitude, lng: marker.Longitude }}
                                    icon={{
                                        url: "http://maps.google.com/mapfiles/ms/icons/green.png"
                                        // url: "https://img.icons8.com/material-sharp/24/000000/garage-door.png"
                                        // url: "https://img.icons8.com/color/48/000000/place-marker.png"
                                        // url: "https://img.icons8.com/offices/16/000000/marker.png"
                                        // url: "https://img.icons8.com/office/30/000000/marker.png"
                                        // url: "https://img.icons8.com/color/48/000000/map-pin.png"
                                    }}
                                />
                            }   
                        })}
                        {/* <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                        </InfoWindow> */}
                    </Map>
                </div>
                <div>
                    <ExampleData 
                        location={this.state.selectedPlace} 
                    />
                </div>
                
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    // apiKey: process.env.REACT_APP_GOOGLE_API_KEY
    apiKey: 'AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
})(MapContainer);