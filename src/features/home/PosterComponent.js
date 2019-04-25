import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Container, Row, Col } from 'reactstrap';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from 'reactstrap';
export class PosterComponent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      calculatedHeight: 0,
    };
    this.poster = React.createRef();
  }

  getSnapshotBeforeUpdate() {
    console.log('snapshot', Object.assign({}, this.poster));
    return null;
  }
  componentDidMount() {
    setTimeout(
      () => this.setState({ calculatedHeight: this.poster.current.clientWidth * 1.5 }),
      50,
    );
    console.log('did update', Object.assign({}, this.poster));
  }

  render() {
    const { clickSerieDetails } = this.props.actions;
    return (
      <div
        className="poster-image"
        ref={this.poster}
        style={{
          backgroundImage: `url(${this.props.movie.infos.Poster})`,
          height: `${this.state.calculatedHeight}px`,
        }}
      >
        <div className="poster-overlay" />
        <div className="see">
          <div>
            <Button
              className="button-retour"
              align="center"
              onClick={() => {
                clickSerieDetails(this.props.movie);
              }}
              color="warning"
            >
              Voir la Serie
            </Button>
          </div>
        </div>
        <div className="like-buttons">
          <FontAwesomeIcon className="icon-vote" icon={faThumbsDown} size="lg" color="red" />
          <FontAwesomeIcon className="icon-vote" icon={faThumbsUp} size="lg" color="green" />
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
