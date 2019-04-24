import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Search from './Search';
import Loader from './Loader';
import Carousel from 'react-bootstrap/Carousel';
import ResultatComponent from './ResultatComponent';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Recommandations from './Recommandations';
import LastRecent from './LastRecent';

import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/

library.add(faSearch)


export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
 
      <div className="container-fluid test">
        
        <div class="row">
       
          <div class="col-4 col-md-4"></div>
          <div class="col-4 col-md-4"><Search /></div>
          
          <div class="col-4 col-md-4"></div>
        </div>
        <div class="row justify-content-md-center">
          <div className="scroll col-2 col-md-2" ></div>
          <div class="centre col-8 col-md-8"><ResultatComponent /> <LastRecent /></div>
          <div class="col-2 col-md-2 text-center "></div>
        </div>

       
      </div>
  
    );
  }
}
