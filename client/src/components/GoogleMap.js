import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ExampleData from '../ExampleData/ExampleData';

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

class MapContainer extends Component {
    constructor(props) {
        super(props);


        this.state = {
            mapStyles: {
                width: "100%",
                height: "100%",
            },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
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
        return (
            <div>
             <div style={{ position: "relative", width: "100vw", height: "45vh" }} className="border border-dark">
                <Map
                    google={this.props.google}
                    zoom={15}
                    style={this.state.mapStyles}
                    initialCenter={{
                        lat: 41.4993,
                        lng: -81.6944
                    }}
                    fullscreenControl={false}
                    streetViewControl={false}
                    mapTypeControl={false}
                >
                    <Marker position={{ lat: 40, lng: -80 }} />
                    <Marker
                        onClick={this.onMarkerClick.bind(this)}
                        name={"Downtown Cleveland"}
                        position={{ lat: 41.4993,
                            lng: -81.6944 }}
                    />
                    <Marker
                        onClick={this.onMarkerClick.bind(this)}
                        name={"Browns Stadium"}
                        position={{ lat: 41.5061, lng: -81.6995 }}
                    />
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
                location={this.state.selectedPlace} />
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
//                     <Marker
//                         onClick={this.onMarkerClick}
//                         name={"Downtown Cleveland"}
//                     />
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