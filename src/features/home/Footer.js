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

  formatToPost(like, dislike, series) {
    this.setState({ afficheRating: false });
    const { getCompute } = this.props.actions;

    const likeList = Object.keys(series).filter(pk => series[pk]['likeChecked']).map(v => v)
    const dislikeList = Object.keys(series).filter(pk => series[pk]['dislikeChecked']).map(v => v)

    getCompute({ like: likeList, dislike: dislikeList });
  }

  render() {
    return (
      <div className="home-footer row justify-content-center">
        <button type="button" onClick={() => {this.formatToPost(this.props.like, this.props.dislike, this.props.series)}} align="center" className="btn btn-warning">Obtenir des recommandations</button>
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
