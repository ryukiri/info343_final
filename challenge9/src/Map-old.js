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
   
    initLatitude = this.state.list[0]._embedded.venues[0].location.latitude;
    initLongitude = this.state.list[0]._embedded.venues[0].location.longitude;
  }

  onMarkerClick =  (props, marker, e) => {  
    this.setState({
      activeMarker: marker,
      activeEvent: props.event,
      showingInfoWindow: true,
     
    })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  

  render() {
    console.log(this.state);
    for (var i = 0; i < this.state.list.length; i++) {
      indents.push(   
        <Marker
        onClick={this.onMarkerClick}
        name={this.state.list.activeEvent}
        event={this.state.list[i]}
        position={{lat: this.state.list[i]._embedded.venues[0].location.latitude, 
                   lng: this.state.list[i]._embedded.venues[0].location.longitude}} 
        />
  
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
           
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.list.activeEvent}</h1>
                </div>
            </InfoWindow>
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