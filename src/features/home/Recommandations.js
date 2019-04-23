import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Container, Row, Col } from 'reactstrap';
import PosterComponent from './PosterComponent';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Recommandations extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { recommandations: [] };
  }

  componentWillMount() {
    const { getSimilarItems } = this.props.actions;
    const { showDetails } = this.props.home;

    if (showDetails !== null) {
      getSimilarItems(this.props.home.showDetails.pk).then(response => {
        this.setState({ recommandations: response.data });
      });
    }
  }

  componentDidUpdate(nextProps) {
    const { getSimilarItems, getRecentSerie } = this.props.actions;
    const { showDetails } = this.props.home;
    if (nextProps.home.showDetails !== this.props.home.showDetails) {
      getSimilarItems(this.props.home.showDetails.pk).then(response => {
        this.setState({ recommandations: response.data });
      });
    }
  }

  render() {
    const { showDetails } = this.props.home;
    const { clickSerieDetails } = this.props.actions;
    if (showDetails !== null) {
      return (
        <Row className="home-similar-items">
          <div className="col-md-4" />
          <div className="col-md-4">
            <div className="row justify-content-center">Series similaires</div>
          </div>
          <div className="col-md-4" />

          <Row className="similar">
            {this.state.recommandations.map((item, i) => (
              <Col>
                {item.name}

                <p>
                  <img
                    className="img-recommandation"
                    onClick={() => clickSerieDetails(item)}
                    alt=""
                    src={item.infos.Poster}
                  />
                </p>
              </Col>
            ))}
          </Row>
        </Row>
      );
    } else {
      return <div />;
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
)(Recommandations);
