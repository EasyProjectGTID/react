import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Loader from './Loader';
import SerieDetails from './SerieDetails';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import PosterComponent from './PosterComponent';

export class ResultatComponent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { moviePk: null };
  }

  renderText() {
    const { resultatRecherche } = this.props.home;
    if (resultatRecherche.length === 0) {
      return <Row />;
    } else {
      return (
        <Row className="resultatText row justify-content-center">
          <div className="resultatText" align="center">
            Vos résultats de recherche
          </div>
        </Row>
      );
    }
  }

  render() {
    const { resultatRecherche, showDetails } = this.props.home;
    const { clickSerieDetails } = this.props.actions;
    if (showDetails === null) {
      return (
        <div>
          {this.renderText()}

          <Row className="home-resultat-component">
            {this.props.home.searchActionPending && (
              <Col align="center">
                <Loader className="search-loader" />
              </Col>
            )}

            {resultatRecherche &&
              resultatRecherche.map((item, i) => (
                <Col id={item.name}>
                  <PosterComponent movie={item} />
                </Col>
              ))}
          </Row>
          <div className="separateur" />
        </div>
      );
    } else {
      return <SerieDetails />;
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultatComponent);
