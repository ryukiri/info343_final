import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import IntegrationAutosuggest from './Autosuggest.js'
import FullScreenDialog from './FullScreenDialog.js'
import SimpleMap from './SimpleMap.js';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
    handleClick() {
        ReactDOM.render(<SimpleMap />, document.getElementById('root'));
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
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a className="navLink" href="">Nav Link 1</a></li>
                                    <li>
                                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect navLink">
                                            Sign Up
                                        </button>
                                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect navLink">
                                            Log In
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    

                        <div className="card container mainbox">
                            <form action="#" className="locationForm">
                                <i className="material-icons">search</i>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="sample3"/>
                                    <label className="mdl-textfield__label" htmlFor="sample3">Search</label>
                                </div>
                                <div className="mdl-textfield mdl-js-textfield">
                                {/*
                                    <input className="mdl-textfield__input" type="text" id="sample1"/>
                                    <label className="mdl-textfield__label" htmlFor="sample1">Seattle, WA</label>
                                */}
                                    <IntegrationAutosuggest className="mdl-textfield__input" />
                                </div>
                                <a>
                                    {/*<button><i className="material-icons">send</i></button>*/}
                                    <button onClick={this.handleClick}><i className="material-icons">send</i></button>
                                </a>
                            </form>
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

}

export default App;
