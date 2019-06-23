import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Row } from 'reactstrap';
import { Button } from 'reactstrap';
import Recommandations from './Recommandations';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TagCloud } from 'react-tagcloud';

export class SerieDetails extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cloudWord: false,
      afficheRating: this.props.home.showDetails.afficheVote,
      words: [],
    };
  }

  componentWillMount() {
    const { getWordsOfSerie } = this.props.actions;
    const { showDetails } = this.props.home;

    getWordsOfSerie(showDetails.pk).then(response => {
      this.setState({ words: response.data });
    });
  }

  formatToPost(args, choice) {
    const { isMyVotesComponent } = this.props;
    this.setState({ afficheRating: false });
    const { vote } = this.props.actions;
    vote({ args, choice })
      .then(() => {
        isMyVotesComponent && this.props.onVoteCallback();
      })
      .catch(err => console.error(err));
  }
  componentDidUpdate(prevProps, prevState) {
    const { showDetails } = this.props.home;
    const { getWordsOfSerie } = this.props.actions;
    if (prevProps.home.showDetails != showDetails)
      getWordsOfSerie(showDetails.pk).then(response => {
        this.setState({ words: response.data, afficheRating: showDetails.afficheVote });
      });
  }

  searchWord(value) {
    const { searchAction, searchTextUpdate } = this.props.actions;
    console.log('totototototto', value)
    searchTextUpdate(value);
    searchAction(value);
  }

  clickCloud(arg) {
    this.setState({ cloudWord: !arg });
  }

  render() {
    const { showDetails, typeApp } = this.props.home;
    const { clickSerieDetails } = this.props.actions;

    return (
      <div className="container tutu ">
        <div class="row ">
          <div class="col-md-8 film-focus offset-md-2 col-md-8 film-focus offset-md-2">
            <div class="row">
              <div class="col-md-4 desc-img">
                {' '}
                <img
                  className="seriePoster"
                  src={showDetails.infos.Poster}
                  alt="Mad Max: Fury Road"
                />
                {showDetails.afficheVote && this.state.afficheRating && (
                  <div className="row ">
                    <div class="col-md-6 vote-button">
                      <FontAwesomeIcon
                        className="icon-vote-details"
                        icon={faThumbsDown}
                        size="lg"
                        color="red"
                        onClick={() => {
                          this.formatToPost(showDetails.pk, '0');
                        }}
                      />
                    </div>
                    <div class="col-md-6 vote-button">
                      <FontAwesomeIcon
                        className="icon-vote-details"
                        icon={faThumbsUp}
                        size="lg"
                        color="green"
                        onClick={() => {
                          this.formatToPost(showDetails.pk, '1');
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div class="col-md-8 desc-text">
                <div class="container">
                  <div class="row">
                    <div class="col-md-8 film-title">
                      <h3>
                        <strong>{showDetails.name}</strong>
                      </h3>
                    </div>
                    <div class="col-md-4 film-date">
                      <span>{showDetails.infos.Year}</span>
                    </div>
                  </div>
                </div>
                <p>{showDetails.infos.Plot}</p>
                <div class="container prod">
                  <div class="row">
                    <div class="col-md-4">
                      <span class="real">Réalisateur</span>
                      <div class="real-value">{showDetails.infos.Writer}</div>
                    </div>
                    <div class="col-md-8">
                      <span class="cast">Acteurs</span>
                      <div class="cast-value">{showDetails.infos.Actors}</div>
                    </div>
                  </div>
                </div>
                <div class="desc-film-btns">
                  {showDetails.infos.Genre.split(',').map((item, i) => (
                    <span key={i} class="badge badge-pill badge-warning">
                      {' '}
                      {item}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Row className="backToresult row justify-content-center">
              <div className="col">
                <Button
                  className="button-retour"
                  align="center"
                  onClick={() => clickSerieDetails(null)}
                  color="warning"
                >
                  Revenir aux résultats
                </Button>
              </div>
              <div className="col">
                {!this.state.cloudWord && (
                  <Button
                    className="button-words"
                    align="center"
                    onClick={() => this.clickCloud(this.state.cloudWord)}
                    color="warning"
                  >
                    Voir les mots
                  </Button>
                )}
                {this.state.cloudWord && (
                  <Button
                    className="button-words"
                    align="center"
                    onClick={() => this.clickCloud(this.state.cloudWord)}
                    color="warning"
                  >
                    Voir les recommandations
                  </Button>
                )}
              </div>
            </Row>
            <div className="separateur" />
          </div>
        </div>
        {!this.state.cloudWord && (
          <div>
            <div className="row justify-content-md-center serie-similaire">Series similaires</div>{' '}
            <Recommandations />
          </div>
        )}

        {this.state.cloudWord && (
          <div className="row justify-content-md-center">
            <div className="home-cloud-word">
              <TagCloud
                minSize={13}
                maxSize={55}
                tags={this.state.words}
                className="simple-cloud"
                shuffle={true}
                onClick={tag => this.searchWord(tag.value)}
              />
            </div>
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
)(SerieDetails);
