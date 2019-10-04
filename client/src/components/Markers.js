import React, { Component } from 'react';
import {Marker} from 'google-maps-react';

class Markers extends Component 
{
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.Latitude,
      lng: this.props.Longitude,
      name: this.props.Address
    }
  }

  render() {
    return (
      <div>
          <Marker
    name={this.props.Address}
    position={{ lat: this.props.Latitude, lng: this.props.Longitude }}
                    />
      </div>
    )
  }
}

export default Markers;