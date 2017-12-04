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

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list: []
    };
  }

  componentDidMount(){
    if (this.props.list[0]) {
      initLatitude = this.props.list[0]._embedded.venues[0].location.latitude;
      initLongitude = this.props.list[0]._embedded.venues[0].location.longitude;
    }
  }

  render() {
    return (  
      <div>
        <div className="mapMain">
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
              {this.props.list.map((item) => {
                return (
                    <Marker
                      key={item.id}
                      onClick={this.onMarkerClick}
                      name={'SOMA'}
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