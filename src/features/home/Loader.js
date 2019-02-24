import React, { Component } from 'react';

export default class Loader extends Component {
  static propTypes = {

  };

  render() {
    return (
        <div class="spinner-border fast" role="status">
          <span class="sr-only">Loading...</span>
        </div>
       
    );
  }
}
