import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Search from './Search'
import Loader from './Loader'
import CarrouselToVote from './CarrouselToVote'
import Carousel from 'react-bootstrap/Carousel'
/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div>
      <Container>
        <Row>
          <Col><Search /></Col>
        </Row>

      </Container>
      <Container>
        <Row>
          <Col>
          
            <CarrouselToVote /></Col>
        </Row>
      </Container>
      </div>
    );
  }
}




