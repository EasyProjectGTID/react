import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';


export class Footer extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  formatToPost(like, dislike) {
    this.setState({ afficheRating: false });
    const { getCompute } = this.props.actions;

    getCompute({ like, dislike });
  }

  render() {
    return (
      <div className="home-footer row justify-content-center">
        <button type="button" onClick={() => {this.formatToPost(this.props.like, this.props.dislike)}} align="center" className="btn btn-warning">Obtenir des recommandations</button>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
