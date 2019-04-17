import React, { Component } from 'react';

export default class Loader extends Component {
  static propTypes = {

  };

  render() {
    return (

        <div className="spinner-border slow" role="status">
          <span className="sr-only">Loading...</span></div>
          
        
    );
  }
}
