import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import List from './List';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const style = {
  width: '100%',
  height: '500px'
}

var STORAGE_KEY = 'locationList';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
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
       <div>
         <nav>
            <div className="nav-wrapper container">
                <a className="navLink" href="#" className="brand-logo">Bored</a>
            </div>
        </nav>
          <div className="mapRender">
            <Map
              google={this.props.google}
              style={style}
              initialCenter={{
                lat: 47.657594,
                lng: -122.309012
              }}
              zoom={15}
              onClick={this.onMapClicked}
            >
            </Map>
          </div>

          <div className="bottom">
            <List
                list={this.state.list}
            />
          </div>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAnBYl2xjEkR7CgMPlG9jHPua8Kyo5sWz0')
})(SimpleMap);