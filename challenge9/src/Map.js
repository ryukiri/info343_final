import React, { Component } from 'react';
import List from './List';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const style = {
  width: '65%',
  height: '100%',
  paddingRight: '300px',
  
}

var STORAGE_KEY = 'locationList';
var savedListString; 
var savedListArray; 

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

  render() {
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
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAnBYl2xjEkR7CgMPlG9jHPua8Kyo5sWz0')
})(SimpleMap);