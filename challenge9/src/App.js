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
                        <nav className="navBar">
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

                         <div className="container">

                             {this.state.eventID ? (
                                <Map 
                                    className="card map" 
                                    eventName= {this.state.eventName}
                                    eventURL= {this.state.eventURL}
                                    events= {this.state.events}
                                    eventID= {this.state.eventID}
                                    list= {this.state.list}
                                />
                             ) : (
                                <div>
                                    <div className="container topCards">
                                        <h2>About</h2>
                                        <p>
                                            Ever find yourself without something to do? You and your squad tired of sitting around watching
                                            Netflix all weekend? Are you bored? Well, now with our app, you'll never be bored again! Introducing
                                            Bored: the best way to search for events and activities near you! Simply type in your location, and 
                                            a list of events will appear. 
                                        </p>
                                    </div>

                                    <div className="container row devCards">
                                        <h3>Meet the Team</h3>
                                        <div className="col-md-4">
                                            <AliCard/>
                                        </div>

                                        <div className="col-md-4">
                                            <AustinCard/>
                                        </div>

                                        <div className="col-md-4">
                                            <MichelleCard/>
                                        </div>
                                    </div>
                                 </div>
                             )
                            }
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
            //console.log(url);
        } else{
            url = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=' + query + '&apikey=' + API_KEY;
            //console.log(url);
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
                    //console.log(events[0].classifications[0].genre.name);
                    //console.log(events);
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
                }
            })
        }    
        
        handleFormSubmit(item) {
            this.fetchEvents(item);
        }
}

export default App;
