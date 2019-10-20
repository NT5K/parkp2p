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
    componentDidMount() {
        fetch('/api/public/driveways')
            .then(res => res.json())
            .then(marker => 
                this.setState({ 
                    marker,
                    personLoggedIn: this.state.marker[this.state.token - 1]
                }))
            .then(()=> 
                this.setState({
                    selectedPlace: this.state.marker[this.state.token - 1]
                }))
            .then( () => console.log("successful markers data fetch"))
            // .then( () => console.log("this is the person logged in", this.state.marker[this.state.token - 1]))
            // .then( () => console.log("this is the person logged in", this.state.personLoggedIn.Description))
            .catch(err => console.log(err));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if (nextProps.Coords !== this.props.Coords) {
            let latLng = { lat: nextProps.Coords.lat1, lng: nextProps.Coords.Lng1 }
            this.setState({ selectedPlace: latLng })
        }
    }

    onMarkerClick(locationString) {
        // console.log("LOCATION STRING", locationString)
        this.setState({
            selectedPlace: locationString
        })
    }

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
                <div style={{ position: "relative", height: "50vh", width: "100vw" /*marginBottom: "3.5%"*/}} id="map">
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
                        <Marker
                            onClick={this.onMarkerClick}
                            address={'You are Here'}
                            label={"X"}
                            // animation={2}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/red.png"
                            }}
                        />
                        {marker.map(marker =>
                            <Marker
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

                                // animation={1}
                                position={{ lat: marker.Latitude, lng: marker.Longitude }}
                                icon={{
                                    url: "http://maps.google.com/mapfiles/ms/icons/green.png"
                                }}
                            />
                        )}
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