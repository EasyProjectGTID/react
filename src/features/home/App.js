import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Search from './Search';
import { ToastContainer, toast } from 'react-toastify';
import ResultatComponent from './ResultatComponent';
import 'react-toastify/dist/ReactToastify.css';

import LastRecent from './LastRecent';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SignOrConnectModal from './SignOrConnectModal';
import RecommandCompute from './RecommandCompute';
import MesVotes from './MesVotes';
import CloudWord from './CloudWord';



/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/

library.add(faSearch);

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { registerUser } = this.props.actions;
    try {
      const user = JSON.parse(
        document.querySelector('#root').getAttribute('data-django') && document.querySelector('#root'),
      );
      console.log(user);

      registerUser(user);
    } catch (err) {
      console.error('Failed to parse data', err);
    }
  }

  notify = args => toast(args);

  render() {
    const { voteSuccess, typeApp, deleteVoteSuccess } = this.props.home;
    if (typeApp === 'search') {
      return (
        <div className="container-fluid test">
          <link href="https://fonts.googleapis.com/css?family=Baloo+Bhai" rel="stylesheet" />
          <SignOrConnectModal />
          <div className="row">
            <ToastContainer />
            {voteSuccess && this.notify("Merci d'avoir voté !")}

            <div className="col-4 col-md-4" />
            <div className="col-4 col-md-4">
              <Search />
            </div>

            <div className="col-4 col-md-4" />
          </div>
          <div className="row justify-content-md-center">
            <div className="scroll col-2 col-md-2" />
            <div className="centre col-8 col-md-8">
              <ResultatComponent /> <LastRecent />
            </div>
            <div className="col-2 col-md-2 text-center " />
          </div>
        </div>
      );
    }

    if (typeApp === 'recommandCompute') {
      return (
        <div className="container-fluid test">
        <link href="https://fonts.googleapis.com/css?family=Baloo+Bhai" rel="stylesheet" />
          <SignOrConnectModal />

          <ToastContainer />
          {voteSuccess && this.notify("Merci d'avoir voté !")}
          <div className="row justify-content-md-center">
            <div className="scroll col-2 col-md-2" />
            <div className="centre col-8 col-md-8 col-centered">
              <RecommandCompute />
            </div>
            <div className="scroll col-2 col-md-2" />
          </div>
        </div>
      );
    }
    if (typeApp === 'mesVotes') {
      return (
        <div className="container-fluid test">
        <link href="https://fonts.googleapis.com/css?family=Baloo+Bhai" rel="stylesheet" />
          <ToastContainer>
            {' '}
            {deleteVoteSuccess && this.notify('Suppression Enregistrée')}{' '}
            {voteSuccess && this.notify("Merci d'avoir voté !")}
          </ToastContainer>

          <div className="row justify-content-md-center">
            <div className="scroll col-2 col-md-2" />
            <div className="centre col-8 col-md-8 col-centered">
              <ResultatComponent />
              <MesVotes />
            </div>
            <div className="scroll col-2 col-md-2" />
          </div>
        </div>
      );
    }

    if (typeApp === 'populaire') {
      return (
        <div className="container-fluid test">
        <link href="https://fonts.googleapis.com/css?family=Baloo+Bhai" rel="stylesheet" />
          <SignOrConnectModal />

          <div className="row justify-content-md-center">
            <div className="scroll col-2 col-md-2" />
            <div className="centre col-8 col-md-8 col-centered">
              <ResultatComponent />
              <CloudWord />
            </div>
            <div className="scroll col-2 col-md-2" />
          </div>
        </div>
      );
    }

     else {
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
)(App);
