import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

export class PosterComponent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      calculatedHeight: 0,
      afficheRating: this.props.movie.afficheVote,
    };
    this.poster = React.createRef();
  }

  getSnapshotBeforeUpdate() {
    return null;
  }
  componentDidMount() {
    setTimeout(
      () => this.setState({ calculatedHeight: this.poster.current.clientWidth * 1.5 }),
      50,
    );
  }
componentDidUpdate(prevProps, prevState) {
  if(prevProps.movie.afficheVote !== this.state.afficheRating){
    this.setState({afficheRating: this.props.movie.afficheVote})
  }
}
  formatToPost(args, choice) {
    const { isMyVotesComponent } = this.props
    this.setState({ afficheRating: false });
    const { vote } = this.props.actions;
    vote({ args, choice }).then(
      () => {
        isMyVotesComponent && this.props.onVoteCallback()
      }
    ).catch(err => console.error(err))
  }

  render() {
    const { clickSerieDetails, openModalSignOrConnect } = this.props.actions;
    const { modalSignOrConnect, token } = this.props.home;
    const { vote } = this.props.actions;
    console.log(this.props.home.token, this.props.home.user)
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

        {this.state.afficheRating && token && (
          <div className="like-buttons">
            <FontAwesomeIcon
              className="icon-vote"
              icon={faThumbsDown}
              size="lg"
              color="red"
              onClick={() => {
                this.formatToPost(this.props.movie.pk, '0');
              }}
            />
            <FontAwesomeIcon
              className="icon-vote"
              icon={faThumbsUp}
              size="lg"
              color="green"
              onClick={() => {
                this.formatToPost(this.props.movie.pk, '1');
              }}
            />
          </div>
        )}

        {!token && (
          <div className="like-buttons">
            <FontAwesomeIcon
              className="icon-vote"
              icon={faThumbsDown}
              size="lg"
              color="red"
              onClick={() => {
                openModalSignOrConnect(!modalSignOrConnect);
              }}
            />
            <FontAwesomeIcon
              className="icon-vote"
              icon={faThumbsUp}
              size="lg"
              color="green"
              onClick={() => {
                openModalSignOrConnect(!modalSignOrConnect);
              }}
            />
          </div>
        )}
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
