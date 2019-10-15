import React, {Component} from 'react';
import './StreetView.css';
    
class StreetView extends Component {


render() {
    
    return (
        <div>
{this.props.location.position != undefined &&
<img src={"https://maps.googleapis.com/maps/api/streetview?size=370x380&location=" + this.props.location.position.lat + "," + this.props.location.position.lng +
"&fov=80&heading=70&pitch=0&key=AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g"} alt="No StreetView Images available" className="StreetView" />
        }
    </div>
    )
}
}

export default StreetView;