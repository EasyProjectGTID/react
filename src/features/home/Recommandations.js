import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Col } from 'reactstrap';
import PosterComponent from './PosterComponent';


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
    const { getSimilarItems } = this.props.actions;
   
    if (nextProps.home.showDetails !== this.props.home.showDetails) {
      getSimilarItems(this.props.home.showDetails.pk).then(response => {
        this.setState({ recommandations: response.data });
      });
    }
  }

  render() {
    const { showDetails } = this.props.home;

    if (showDetails !== null) {
      return (
        <div class="row justify-content-md-center">
        
          {this.state.recommandations.map((item, i) => (
            <Col className="col-md-2 " key={i}>
              <PosterComponent movie={item} />
            </Col>
          ))}
        </div>
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
