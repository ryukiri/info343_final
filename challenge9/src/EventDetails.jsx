import React, { Component } from 'react';

class EventDetails extends Component {
    render() {
        var badSearch = this.props.badSearch;
        return (
            <div>
                {!badSearch ? (
                    <form
                        onSubmit={(e) => {
                            this.handleFormSave(e);
                        }}
                    >
                        <ul>
                            <span>{this.props.EventDetails}</span>
                        </ul>
                    </form>
                ) : (
                    <div className="alert alert-danger">
                        Invalid location.
                    </div>
                )}
            </div>
        );
    }
 }
export default EventDetails;