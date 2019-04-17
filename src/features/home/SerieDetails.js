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
      <div className="serie-details-row h-100 ">
        <Row className="test">
  
          <div class="col col-md-2" >
            <img className="serie-poster" src={showDetails.infos.Poster} alt="toto" />
          </div>
          
          <div className="col auto offset-2" >
            <Table>
              <tbody>
                <tr>
                  <td>Année de sortie</td>
                  <td>{showDetails.infos.Year}</td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>
                    {showDetails.infos.Genre.split(',').map((item, i) => (
                      <span key={i} class="badge badge-pill badge-warning">{item} </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Acteurs</td>
                  <td>{showDetails.infos.Actors}</td>
                </tr>
                <tr>
                  <td>Pays de production</td>
                  <td>{showDetails.infos.Country}</td>
                </tr>
              </tbody>
            </Table>
          </div>
   
          
        </Row>
        

        <Row className="row justify-content-md-center">
          <Col sm="8">
            {' '}
            <p className="synopsis-p" align="center">
              Synopsis
            </p>{' '}
            <p>{showDetails.infos.Plot}</p>
          </Col>
        </Row>

        <Row align="center">
          <Button
            className="button-retour"
            align="center"
            onClick={() => clickSerieDetails(null)}
            color="warning"
          >
            Revenir aux résultats
          </Button>
        </Row>
        <Row>
          <Recommandations />
        </Row>
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
