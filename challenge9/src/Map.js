import React, { Component } from 'react';
import List from './List';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

var initLatitude;
var initLongitude;
var indents = [];


const style = {
  width: '65%',
  height: '100%',
  paddingRight: '300px',  
}

var STORAGE_KEY = 'locationList';

class SimpleMap extends Component {
  constructor(props) {
    super(props);
     
    var savedListString = localStorage.getItem(STORAGE_KEY);
    var savedListArray = JSON.parse(savedListString) || [];
    
    this.state = {
      list: savedListArray
    };

  }

  componentDidMount(){
    console.log(this.state.list);
  }

  componentDidMount(){
    console.log(this.state.list);
    initLatitude = this.state.list[0]._embedded.venues[0].location.latitude;
    initLongitude = this.state.list[0]._embedded.venues[0].location.longitude;
  }

  render() {
    for (var i = 0; i < this.state.list.length; i++) {
      indents.push(
        <Marker
        onClick={this.onMarkerClick}
        name={'SOMA'}
        position={{lat: this.state.list[i]._embedded.venues[0].location.latitude, 
                   lng: this.state.list[i]._embedded.venues[0].location.longitude}} />
      );
    }
    return (
      <div>
        {
        <div className="mapMain">
          <nav>
            <div className="nav-wrapper container">
              <a className="navLink" href="#" className="brand-logo">Bored</a>
            </div>
          </nav>

          <div className="mapRender">
            <Map
              google={this.props.google}
              style={style}
              center={{
                lat: initLatitude,
                lng: initLongitude
              }}
              zoom={12}
              onClick={this.onMapClicked}
            >
              {indents}
            </Map>
          </div>

          <div className="bottom">
            <List
                list={this.state.list}
            />         
          </div>

          
          
        </div>
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAnBYl2xjEkR7CgMPlG9jHPua8Kyo5sWz0')
})(SimpleMap);