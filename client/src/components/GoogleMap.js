import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ExampleData from './ExampleData';
import Markers from './Markers'
const styles = require('./GoogleMapStyles.json')

// const styles = {
//     shadow: {
//         boxShadow: "4px 4px 4px #9E9E9E"
//     },
//     zIndex: {
//         zIndex: 0
//     }
// }

// const mapStyles = {
//     width: '100%',
//     height: '40%'
// };

const exampleMapStyles = [
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
];

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapStyles: {
                width: "100%",
                height: "100%"
            },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},
            Address: '',
            lat: 0,
            lng: 0,
            marker: []
        };
        
        this.onMarkerClick = this.onMarkerClick.bind(this);
        
    }

    componentDidMount() {
    fetch('/api/NewUserSeeds')
    .then(res => res.json())
    .then(marker => this.setState({ marker }, () => console.log(this.state.marker)))
    .catch(err => console.log(err));
    }

    onMarkerClick(locationString){
        console.log(locationString)
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
        const { marker } = this.state
        return (
            <div>
             <div style={{ position: "relative", width: "100vw", height: "50vh" }} className="">
                <Map
                    google={this.props.google}
                    zoom={12}
                    style={this.state.mapStyles}
                    initialCenter={{
                        lat: 41.4993,
                        lng: -81.6944
                    }}
                    
                    fullscreenControl={false}
                    streetViewControl={false}
                    mapTypeControl={false}
                    // styles={styles}
                    > 
                    {marker.map(marker =>
                        <Marker
                            onClick={this.onMarkerClick}
                            address={marker.Address}
                            description={marker.Description}
                            hourly={marker.Hourly}
                            daily={marker.Daily}
                            weekly={marker.Weekly}
                            monthly={marker.Monthly}
                            position={{ lat: marker.Latitude, lng: marker.Longitude }}
                        />
                        // <Marker key={marker.Address} name={marker.Address} lat={marker.Latitude} lng={marker.Longitude}/>
                    )}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                    </InfoWindow>
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
    apiKey: 'AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
})(MapContainer);

// class MapContainer extends Component {


    // state = {
    //     showingInfoWindow: false,  //Hides or the shows the infoWindow
    //     activeMarker: {},          //Shows the active marker upon click
    //     selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    // };

    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });

    // onClose = props => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // };

//     render() {
//         return (
//             <div style={{ ...styles.shadow, ...styles.zIndex }, { position: 'relative', width: '100vw', height: '80vh' } } >
//                 <Map
//                     google={this.props.google}
//                     zoom={14}
//                     style={mapStyles}
//                     initialCenter={{
//                         lat: 41.4993,
//                         lng: -81.6944
//                     }}
                    // fullscreenControl={false}
                    // streetViewControl={false}
                    // mapTypeControl={false}
//                 >
                    // <Marker
                    //     onClick={this.onMarkerClick}
                    //     name={"Downtown Cleveland"}
                    // />
//                     <Marker
//                         onClick={this.onMarkerClick}
//                         name={"Browns Stadium"}
//                         position={{ lat: 41.5061, lng: -81.6995 }}
//                     />
                    // <InfoWindow
                    //     marker={this.state.activeMarker}
                    //     visible={this.state.showingInfoWindow}
                    //     onClose={this.onClose}
                    // >
                    //     <div>
                    //         <h4>{this.state.selectedPlace.name}</h4>
                    //     </div>
                    // </InfoWindow>
//                 </Map>
//             </div>
//         );
//     }
// }