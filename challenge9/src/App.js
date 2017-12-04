import React, { Component } from 'react';

import './App.css';
import Map from './Map.jsx';
import Search from './Search'; 
import AliCard from './AliCard'; 
import AustinCard from './AustinCard'; 
import MichelleCard from './MichelleCard'; 
import List from './List';

var STORAGE_KEY = 'locationList';

var API_KEY = 'HZvSWXD4M5MuKkSD4TVPl3GRKCuUpQIW';
var events;
var changeInfoError = document.getElementById('change-error');

// error message for invalid location search 
function changeError(message) {
    changeInfoError.textContent = message;
    changeInfoError.classList.add('active');
  }
  
function clearChangeError() {
    changeInfoError.textContent = "";
    changeInfoError.classList.remove('active');
}

class App extends Component {

    constructor(props) {
        super(props);
         
        this.state = {
            list: []
        };
    }
         
    componentDidMount() {
        var savedListString = localStorage.getItem(STORAGE_KEY);
        var savedListArray = JSON.parse(savedListString) || [];
    
        this.setState({
            list: savedListArray
        });
    }

    render() {
        return (
            <div>
                {/* Your app content goes here */
                <div className="maindiv">
                    <div className="top">
                        <nav>
                            <div className="nav-wrapper container">
                                <a className="navLink" href="index.html" className="brand-logo">Bored</a>
                            </div>
                        </nav>

                        <div className="card container mainbox" id="mainbox">
                            <Search className="locationForm"
                                list = {this.state.list}
                                
                                onFormSubmit={(item) => {
                                    this.handleFormSubmit(item);
                                    this.state = {
                                        list: []
                                    };
                                }}
                            />
                            <div id="change-error" className="alert alert-danger" role="alert"></div>
                        </div>

                        <div className="card container mapArea">
                            {this.state.eventID && (
                                <Map 
                                    className="card map" 
                                    eventName= {this.state.eventName}
                                    eventURL= {this.state.eventURL}
                                    events= {this.state.events}
                                    eventID= {this.state.eventID}
                                    center= {{
                                        lat: this.state.list[0]._embedded.venues[0].location.latitude,
                                        lng: this.state.list[0]._embedded.venues[0].location.longitude}}
                                    list= {this.state.list}
                                />
                            )}
                        </div> 
                    </div>

                    <div className="container topCards">
                        <h3>About</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel efficitur velit, quis placerat libero. Nam laoreet lectus mauris, pharetra hendrerit ligula scelerisque non. Proin nec sodales justo, id dictum felis. Suspendisse euismod sed lectus non sagittis. Praesent vel lacinia arcu, faucibus aliquet nisi. Nullam ut neque venenatis, fermentum nulla eget, condimentum urna. Vivamus condimentum, ipsum eget imperdiet lacinia, urna ipsum aliquet lorem, et consequat est lacus sed libero. Quisque sit amet posuere nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In a mollis mauris. Curabitur vel arcu velit.
                        </p>
                        
                        <p>
                            Morbi semper nulla vitae fringilla pellentesque. In hac habitasse platea dictumst. Morbi aliquet vel metus non commodo. In facilisis nunc et ultricies tempor. Vivamus placerat diam elit, vel volutpat nibh malesuada sed. Cras at ornare nunc, in imperdiet mauris. Nulla at sapien mi.
                        </p>
                    </div>

                    <div className="container row devCards">
                        <h3>Meet the Team</h3>
                        <div className="col-md-4 singleDevCard">
                            <AliCard/>
                        </div>

                        <div className="col-md-4 singleDevCard">
                            <AustinCard/>
                        </div>

                        <div className="col-md-4 singleDevCard">
                            <MichelleCard/>
                        </div>
                    </div>
         
                    <footer className="mdl-mini-footer">
                        <div className="mdl-mini-footer__left-section">
                            <div className="mdl-logo">
                                &copy; 2017 Bored Inc.
                            </div>
                        </div>
                    </footer>
                </div>
                }
            </div>
        );
    }

    fetchEvents(query) {
        var url;
        if (isNaN(query)) {
            url = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=' + query + '&apikey=' + API_KEY;            
        } else{
            url = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=' + query + '&apikey=' + API_KEY;
        }

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if(json.page.totalElements === 0) {
                    changeInfoError = document.getElementById('change-error');
                    changeError("Invalid city (or there are no events near here)");
                } else {
                    changeInfoError = document.getElementById('change-error');
                    clearChangeError();
                    
                    events = json._embedded.events;
                    var event = events[0];
                    var eventID = event.id;
                    var eventName = event.name;
                    var eventURL = event.url;
                    var existingList = this.state.list;

                    for(var i = 0; i < events.length; i++) {
                        existingList = existingList.concat([ events[i] ]);
                    }

                    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));
                    
                    this.setState({
                        eventName: eventName,
                        eventURL: eventURL,
                        events: events,
                        eventID: eventID,
                        list: existingList
                    });

                    var mainBox = document.getElementById('mainbox');
                    var root = document.getElementById('root');
                    mainBox.classList.add('searched');
                    root.classList.add('searched');
                }
            })
        }    
        
        handleFormSubmit(item) {
            this.fetchEvents(item);
        }
}

export default App;
