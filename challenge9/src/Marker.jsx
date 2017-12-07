import React, { Component } from 'react';
import List from './List';
import ReactDOMServer from 'react-dom/server';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';


class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }
  
  
  onMarkerClick = (props, marker, e) => {
    debugger;
    console.log('hello');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      name: this.state.list.name
    });
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
 return (
   
      <Map google ={this.props.google}
          onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={this.state.list.name} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.list.event}</h1>
            </div>
        </InfoWindow>
      </Map>
    
    );
  
  }
}
export default Marker;
  