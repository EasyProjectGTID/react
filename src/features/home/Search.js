import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ResultatComponent from './ResultatComponent';
import { Row } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap';

import { Form } from 'react-bootstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

export class Search extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { searchText: '', resultatState: [], focus: false };
  }

  focus = event => {
    event.preventDefault();
    this.setState({
      focus: !this.state.focus,
    });
  };

  render() {
    const { searchAction } = this.props.actions;

    return (
      <Container className="container-search">
        <div className="container-search">
          <input type="text" className={this.state.focus && 'focused'} placeholder="Search" 
          onChange={event => {
              this.setState({ searchText: event.target.value });
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.setState({ resultatState: [] });
                if (this.state.searchText.length !== 0) {
                  searchAction(this.state.searchText);
                }
              }
            }}/>
          <button onClick={this.focus} id="search-button" className={this.state.focus && 'active'}>
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
        {/*<InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon="search" />
            </InputGroupText>
          </InputGroupAddon>
          <Input className=""
            size="md"
            type="text"
            placeholder="Recherche par mot clés ou nom de serie"
            onChange={event => {
              this.setState({ searchText: event.target.value });
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.setState({ resultatState: [] });
                if (this.state.searchText.length !== 0) {
                  searchAction(this.state.searchText);
                }
              }
            }}
          />
        </InputGroup>*/}
      </Container>
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
)(Search);
