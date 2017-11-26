import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: 47.658109, lng: -122.308},
    zoom: 14
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={47.658109}
          lng={-122.308618}
          text={'UW Campus'}
        />
      </GoogleMapReact>
    );
  }
}

export default SimpleMap;