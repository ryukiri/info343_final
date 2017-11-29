import React, { Component } from 'react';

class List extends Component {
   render() {
       var arrayIsNotEmpty = this.props.list.length > 0;

       return (
           <div>
               {arrayIsNotEmpty ? (
                   <div>
                       <h2>Events</h2>
                       <ul className="list-group">
                           {this.props.list.map((item, index) => {
                               return (
                                   <li className="list-group-item" key={index}>
                                       <a onClick={(e) => {
                                           e.preventDefault();
                                       }}
                                       >{item}</a>
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