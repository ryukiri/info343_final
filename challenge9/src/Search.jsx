import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        this.handleFormSubmit(e);
                    }}
                >
                    <i className="material-icons">search</i>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input ref="inputBox" className="mdl-textfield__input" type="text" id="sample3"/>
                        <label className="mdl-textfield__label" htmlFor="sample3">Search</label>
                    </div>
                    <a>
                        <button className= "searchButton" type="submit"><i className="material-icons">send</i></button>
                    </a>
                </form>
            </div>
        );
    }
 
    handleFormSubmit(e) {
        e.preventDefault();
 
        var item = this.refs.inputBox.value;
 
        this.props.onFormSubmit(item);
    }
 }
 
 export default Search;