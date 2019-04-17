import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Container, Row, Col } from 'reactstrap';
export class LastRecent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { lastR: [] };
  }

  componentDidMount() {
    const { getRecentSerie } = this.props.actions;
    const { showDetails } = this.props.home;

    getRecentSerie().then(response => {
      this.setState({ lastR: response.data });
    });
  }

  render() {
    const { showDetails } = this.props.home;
    const { clickSerieDetails } = this.props.actions;
    return (
      <div className="div-container container">
        <Row className="justify-content-center align-self-center">Nos dernière series</Row>
        
        <Row>
        {this.state.lastR.map((item, i) => (
      
            <Col className="col"><b>{item.name}</b>
       
         
                <img
                  className="img-recommandation"
                  onClick={() => clickSerieDetails(item)}
                  alt=""
                  src={item.infos.Poster}
                />
          
            </Col>
       
      
        ))}
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
)(LastRecent);
