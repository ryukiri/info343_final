import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import List from './List';

var STORAGE_KEY = 'locationList';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    apiKey: "AIzaSyAnBYl2xjEkR7CgMPlG9jHPua8Kyo5sWz0",
    center: {lat: 47.658109, lng: -122.308},
    zoom: 14
  };

  constructor(props) {
    super(props);
     
    var savedListString = localStorage.getItem(STORAGE_KEY);
    var savedListArray = JSON.parse(savedListString) || [];
    this.state = {
        list: savedListArray
    };
}

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