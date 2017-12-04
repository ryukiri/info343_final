import React from 'react';

class List extends React.Component {
    details(URL) {
        var dialog = document.querySelector('dialog');
        dialog.showModal();
        dialog.querySelector('.close').addEventListener('click', function() {
            if(dialog.open)
                dialog.close();
        });
    }

    render() {
        var arrayIsNotEmpty = this.props.list.length > 0;

        return (
            <div>
                {arrayIsNotEmpty ? (
                    <div className="materialList">
                        <h2>Events</h2>
                        <ul className="demo-list-item list-group mdl-list">
                            {this.props.list.map((item, index) => {
                                return (
                                    <li className="list-group-item mdl-list__item listItems" key={index}>
                                            <span className="mdl-list__item-primary-content">
                                                <a onClick={(e) => {
                                                    e.preventDefault();
                                                    this.details(item.url);

                                                    var title = document.getElementsByClassName('mdl-dialog__title');
                                                    title[0].textContent = item.name;

                                                    var eventURL = document.getElementById('eventURL');
                                                    eventURL.setAttribute('href', item.url);

                                                    var dates = document.getElementsByClassName('eventDates');
                                                    dates[0].textContent = item.dates.start.localDate + " " + item.dates.start.localTime;

                                                    var priceInfo = document.getElementsByClassName('prices');
                                                    priceInfo[0].textContent = '$' + item.priceRanges[0].min + ' - $' + item.priceRanges[0].max;

                                                    var eventInfo = document.getElementsByClassName('EventInfo');
                                                    eventInfo[0].textContent = item.info;
                                                }}>
                                                    {item.name}
                                                </a>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <dialog className="mdl-dialog">
                            <a id="eventURL" target="_blank"><h4 className="mdl-dialog__title"></h4></a>
                            <h5 className="eventDates"></h5>
                            <div className="mdl-dialog__content">
                                <h3 className="prices"></h3>
                                <p className="EventInfo">
                                </p>
                            </div>
                            <div className="mdl-dialog__actions">
                                <button type="button" className="mdl-button close">Ok</button>
                            </div>
                        </dialog>
                    </div>
                ) : (
                    <div>List is empty</div>
                )}
            </div>
        );
    }
}

export default List;