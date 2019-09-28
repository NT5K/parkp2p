import React from 'react';
import ReactStreetview from 'react-streetview';

class StreetView extends React.Component {

    render() {
        const googleMapsApiKey = "AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g";

        const streetViewPanoramaOptions = {
            position: {lat: 46.9171876, lng: 17.8951832},
            pov: {heading: 100, pitch: 0},
            zoom: 1
        };
 
        return (
            <div style={{
                width: '400px',
                height: '200px',
                backgroundColor: '#eeeeee'
            }}>
                <ReactStreetview
                    apiKey={googleMapsApiKey}
                    streetViewPanoramaOptions={streetViewPanoramaOptions}
                />
            </div>
        );
    }
}

export default StreetView;