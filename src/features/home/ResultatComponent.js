import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Loader from './Loader';
import SerieDetails from './SerieDetails';
import { Row, Col } from 'reactstrap';
import PosterComponent from './PosterComponent';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  closeResultat() {
    const { closeResultat } = this.props.actions;
    closeResultat();
  }

  render() {
    const { resultatRecherche, showDetails } = this.props.home;

    if (showDetails === null) {
      return (
        <div className="div-container container">
          {this.renderText()}

          <Row className="home-resultat-component">
            {resultatRecherche.length !== 0 && (
              <FontAwesomeIcon
                className="icon-close"
                icon={faWindowClose}
                size="2x"
                onClick={() => this.closeResultat()}
              />
            )}
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
