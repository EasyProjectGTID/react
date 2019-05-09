import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Row } from 'reactstrap';
import { Button} from 'reactstrap';
import Recommandations from './Recommandations';


export class SerieDetails extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { showDetails, typeApp } = this.props.home;
    const { clickSerieDetails } = this.props.actions;
    
    return (
      <div className="container tutu">
      
     
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
                 
            
          </div>
          
        </div>
        {typeApp != 'mesVotes' &&
        <Recommandations />}
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
