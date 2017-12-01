import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import FullScreenDialog from './FullScreenDialog.js'
import Map from './Map.js';
import Search from './Search'; 
import AliCard from './AliCard'; 
import AustinCard from './AustinCard'; 
import MichelleCard from './MichelleCard'; 

var STORAGE_KEY = 'locationList';

var API_KEY = 'HZvSWXD4M5MuKkSD4TVPl3GRKCuUpQIW';
var events;
var changeInfoError = document.getElementById('change-error');

//const AnyReactComponent = ({ text }) => <div>{text}</div>;
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
    
    handleClick() {
        ReactDOM.render(<Map />, document.getElementById('root'));
    }

    render() {
        return (
            <div>
                {/* Your app content goes here */
                <div className="maindiv">
                    <div className="top">
                        <nav>
                            <div className="nav-wrapper container">
                                <a className="navLink" href="#" className="brand-logo">Bored</a>
                            </div>
                        </nav>
                    
                        <div className="card container mainbox">
                            <Search className="locationForm"
                                 onFormSubmit={(item) => {
                                     this.handleFormSubmit(item);
                                     this.state = {
                                        list: []
                                     };
                                 }}
                             />
                        <div id="change-error" className="alert alert-danger" role="alert"></div>
                        </div>    
                    </div>

                    <div className="container topCards">
                        <h3>Find Top Attractions Nearby</h3>

                        <div className="row">
                            <div className="col-xs-6 col-md-4">
                                <div className="card attractionCard">
                                    I'm a card!
                                </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="card attractionCard">
                                        I'm a card!
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="card attractionCard">
                                        I'm a card!
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="card attractionCard">
                                        I'm a card!
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="card attractionCard">
                                        I'm a card!
                                    </div>
                                </div>
                                <div className="col-xs-6 col-md-4">
                                    <div className="card attractionCard">
                                        I'm a card!
                                    </div>
                                </div>
                            </div>
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
         
                    <footer className="mdl-mini-footer">
                        <div className="mdl-mini-footer__left-section">
                            <div className="mdl-logo">
                                &copy; 2017 Bored Inc.
                            </div>
                            <ul className="mdl-mini-footer__link-list">
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Privacy & Terms</a></li>
                                <li><a><FullScreenDialog/></a></li>
                            </ul>
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
                console.log(json);
                if(json.page.totalElements == 0) {
                    changeInfoError = document.getElementById('change-error');
                    console.log(changeInfoError);
                    changeError("Invalid city (or there are no events near here)");
                } else {
                    changeInfoError = document.getElementById('change-error');
                    clearChangeError();
                    events = json._embedded.events;
                
                    var event = events[0];
                    var eventID = event.id;
                    var eventName = event.name;
                    var eventURL = event.url;
                    /*console.log(eventID);
                    console.log(eventName);
                    console.log(eventURL);
                    console.log(events);*/

                    var existingList = this.state.list;

                    for(var i = 0; i < events.length; i++) {
                        existingList = existingList.concat([ events[i] ]);
                    }

                    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));
                    
                    this.setState({
                        eventName: eventName,
                        eventURL: eventURL,
                        events: events,
                        eventID, eventID,
                        list: existingList
                    });

                    this.handleClick();
                }
            })
        }   
        
        handleFormSubmit(item) {
            this.fetchEvents(item);
        }

}

export default App;
