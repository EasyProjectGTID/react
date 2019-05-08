import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Loader from './Loader';

import { Row, Col, Button } from 'reactstrap';
import PosterComponent from './PosterComponent';
import SerieDetails from './SerieDetails';

export class Resultat extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { resultatCompute,  showDetails } = this.props.home;
    const { backToCompute } =this.props.actions;
    if ( showDetails === null){
    return (
     <div className="div-container container">


          <Row className="home-resultat-component">
            {this.props.home.searchActionPending && (
              <Col align="center">
                <Loader className="search-loader" />
              </Col>
            )}

            {resultatCompute&&
              resultatCompute.map((item, i) => (
                <Col id={item.name}>
                  <PosterComponent movie={item} />
                </Col>
              ))}
          </Row>
          <div className="separateur" />
           <Row className="backToresult row justify-content-center">
              <Button
                className="button-retour"
                align="center"
                onClick={() => backToCompute([])}
                color="warning"
              >
                Obtenir de nouvelles recommandations
              </Button>
            </Row>
        </div>
      );

  }else{
    return(<div><SerieDetails /></div>)
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resultat);
