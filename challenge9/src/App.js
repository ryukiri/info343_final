import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import FullScreenDialog from './FullScreenDialog.js'
import Map from './Map.js';
import Search from './Search';
import List from './List';

var STORAGE_KEY = 'locationList';

var API_KEY = 'HZvSWXD4M5MuKkSD4TVPl3GRKCuUpQIW';
var events;

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
                                     this.handleClick();
                                     this.state = {
                                        list: []
                                     };
                                 }}
                             />
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
                events = json._embedded.events;
                var event = events[0];
                var eventID = event.id;
                var eventName = event.name;
                var eventURL = event.url;
                var existingList = this.state.list;

                for(var i = 0; i < events.length; i++) {
                    existingList = existingList.concat([ events[i] ]);
                    this.setState({
                        list: existingList
                    });
                }


                localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList));

                this.setState({
                    eventName: eventName,
                    eventURL: eventURL,
                    events: events, 
                });

            })
        }   
        
        handleFormSubmit(item) {
            this.fetchEvents(item);
        }

}

export default App;
