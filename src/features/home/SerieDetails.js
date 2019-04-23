import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Container, Row, Col } from 'reactstrap';
import { Button, Table } from 'reactstrap';
import Recommandations from './Recommandations';
import Vote from './Vote';

export class SerieDetails extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { showDetails } = this.props.home;
    const { clickSerieDetails } = this.props.actions;
    return (
      <div class="container">
      
     
        <div class="row">
        
          <div class="col-md-8 film-focus offset-md-2">
            <div class="row">
        
              <div class="col-md-4 desc-img">
                {' '}
                <img src={showDetails.infos.Poster} alt="Mad Max: Fury Road" />
              </div>
              <div class="col-md-8 desc-text">
                <div class="container">
                  <div class="row">
                    <div class="col-md-8 film-title">
                      <h3>
                        <strong>{showDetails.name}</strong>
                      </h3>
                    </div>
                    <div class="col-md-4 film-date">
                      <span>{showDetails.infos.Year}</span>
                    </div>
                  </div>
                </div>
                <p>{showDetails.infos.Plot}</p>
                <div class="container prod">
                  <div class="row">
                    <div class="col-md-4">
                      <span class="real">Réalisateur</span>
                      <div class="real-value">{showDetails.infos.Writer}</div>
                    </div>
                    <div class="col-md-8">
                      <span class="cast">Acteurs</span>
                      <div class="cast-value">{showDetails.infos.Actors}</div>
                    </div>
                  </div>
                </div>
                <div class="desc-film-btns">
                  {showDetails.infos.Genre.split(',').map((item, i) => (
                    <span key={i} class="badge badge-pill badge-warning">
                      {' '}
                      {item}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Row className="backToresult row justify-content-center">
              <Button
                className="button-retour"
                align="center"
                onClick={() => clickSerieDetails(null)}
                color="warning"
              >
                Revenir aux résultats
              </Button>
            </Row>
            <div className="separateur" />
                 
            <Recommandations />
          </div>
        </div>
      </div>
    );
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
)(SerieDetails);
