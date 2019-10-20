import React, { Component } from 'react';
import {Marker} from 'google-maps-react';

function Markers() {
    return (
      <div>
          <Marker
            name={this.props.name}
            position={{ lat: this.props.Latitude, lng: this.props.Longitude }} />
      </div>
    )
}

export default Markers;