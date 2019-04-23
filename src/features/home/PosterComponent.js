import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export class PosterComponent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { clickSerieDetails } = this.props.actions;
    return (
      <div 
        className="poster-image"
        style={{backgroundImage: `url(${this.props.movie.infos.Poster})`}}
        onClick={() => {
          clickSerieDetails(this.props.movie);
        }}
      >
      <div className='poster-overlay'></div>
      <div className='like-buttons'>
        <FontAwesomeIcon icon="search" />
        <FontAwesomeIcon icon="search" />
      </div>
        {/*<img
          className=""
          src={this.props.movie.infos.Poster}
          alt={this.props.movie.name}
        />*/}

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
)(PosterComponent);
