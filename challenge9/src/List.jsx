import React, { Component } from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog';
  import PropTypes from 'prop-types';
  import Button from 'material-ui/Button';

class List extends React.Component {
    details(URL) {
       window.open(
            URL,
            '_blank'
        );
    
/*
        var dialog = document.querySelector('dialog');
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function() {
            dialog.close();
        });
        */
        /*var text = "test";
        var content = document.getElementsByClassName('mdl-dialog__content');
        var info = document.createElement('p');
        info.textContent = text;
        content.appendChild(info);*/

        /*var content = document.getElementsByClassName('mdl-dialog__content');
        var item = document.createElement('div');
        item.className = "details";
        var text = document.createElement('p');
        item.appendChild(text);*/
    }

    render() {
        var arrayIsNotEmpty = this.props.list.length > 0;

        return (
            <div>
                <dialog className="mdl-dialog">
                    <h4 className="mdl-dialog__title">Allow data collection?</h4>
                    <div className="mdl-dialog__content">
                        <p className="EventInfo">
                        </p>
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="button" className="mdl-button">Agree</button>
                        <button type="button" className="mdl-button close">Disagree</button>
                    </div>
                </dialog>
                
                {arrayIsNotEmpty ? (
                    <div className="materialList">
                        <h2>Events</h2>
                        <ul className="demo-list-item list-group mdl-list">
                            {this.props.list.map((item, index) => {
                                return (
                                    <li className="list-group-item mdl-list__item" key={index}>
                                            <span className="mdl-list__item-primary-content">
                                                <a onClick={(e) => {
                                                    e.preventDefault();
                                                    this.details(item.url);
                                                    console.log("Dates: " + item.dates.start.dateTime);
                                                    console.log("Info: " + item.info);
                                                    console.log("Min Price: " + item.priceRanges[0].min);
                                                    console.log("Max Price: " + item.priceRanges[0].max);

                                                    var eventInfo = document.getElementsByClassName('EventInfo');
                                                    console.log(eventInfo);
                                                    eventInfo.textContent = item.info;
                                                    
                                                }}>
                                                    {item.name}
                                                </a>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div>List is empty</div>
                )}
            </div>
        );
    }
}

export default List;