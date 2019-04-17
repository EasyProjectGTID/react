import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Loader from './Loader';
import SerieDetails from './SerieDetails';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export class ResultatComponent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { moviePk: null };
  }
  render() {
    const { resultatRecherche, showDetails } = this.props.home;
    const { clickSerieDetails } = this.props.actions;
    if (showDetails === null) {
      return (
        <Row className="home-resultat-component">
          {this.props.home.searchActionPending && (
            <Col align="center">
              <Loader className="search-loader" />
            </Col>
          )}

          {resultatRecherche &&
            resultatRecherche.map((item, i) => (
              <Col id={item.name}>
                <div id="results">
                  <div id="elements">
                    <article class="cardCustom" onClick={() => {
                      clickSerieDetails(item);
                    }}>
                      <a href="#" className="cardCustom__link">
                        <span className="" />
                        <img
                          src={item.infos.Poster}
                          alt={item.name}
                          class="cardCustom__image"
                        />
                      </a>
                      <h2 class="cardCustom__title">{item.name}</h2>
                    </article>
                  </div>
                </div>
                </Col>
            ))}
        </Row>
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
