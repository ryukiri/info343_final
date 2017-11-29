import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    apiKey: "AIzaSyAnBYl2xjEkR7CgMPlG9jHPua8Kyo5sWz0",
    center: {lat: 47.658109, lng: -122.308},
    zoom: 14
  };

  render() {
    return (
      <div>
        <nav>
            <div className="nav-wrapper container">
                <a className="navLink" href="#" className="brand-logo">Bored</a>
            </div>
        </nav>
        
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
      </div>
    );
  }
}

export default SimpleMap;