import React, { Component } from 'react';
import List from './List';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const style = {
  width: '65%',
  height: '100%',
  paddingRight: '300px',  
}

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list: [],
      showingInfoWindow: false
    };
  }

  onMarkerClick = (props, marker, e) => {
     console.log(this.state);
     this.setState({
       activeMarker: marker,
       activeEvent: props.event,
       showingInfoWindow: false
     }, () => {
       this.setState({
          showingInfoWindow: true
       })
     })
   }

   onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
        this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
   }

  render() {
    console.log(this.state);
    
    return (  
      <div>
        <div className="mapMain">
          <div className="mapRender">
            <Map
              google={this.props.google}
              style={style}
              center={{
                lat: this.props.list[0]._embedded.venues[0].location.latitude,
                lng: this.props.list[0]._embedded.venues[0].location.longitude
              }}
              zoom={12}
              onClick={this.onMapClicked}
            >
             
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.activeEvent}</h1>
                </div>
             </InfoWindow>
              {this.props.list.map((item) => {
                return (
                    <Marker
                      key={item.id}
                      onClick={this.onMarkerClick}
                      name={this.state.list.activeEvent}
                      event={item._embedded.venues[0].name}
                      position={{
                        lat: item._embedded.venues[0].location.latitude, 
                        lng: item._embedded.venues[0].location.longitude}} 
                    />
                );
              })}
            </Map>
          </div>

          <div className="bottom">
            <List
                list={this.props.list}
            />         
          </div>


        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAnBYl2xjEkR7CgMPlG9jHPua8Kyo5sWz0')
})(SimpleMap);