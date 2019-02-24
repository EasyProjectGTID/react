import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Form } from 'react-bootstrap';

export class Search extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {searchText: ""}
  }

  render() {
    return (
      <div>
      <Form.Control onChange={this.handleChange.bind(this)} size="lg" type="text" placeholder="Recherche par mot clés ou nom de serie" />
      <p> {this.state.searchText}</p>
      </div>

    );
  }


  handleChange(e){
    this.setState({searchText:e.target.value});
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
)(Search);
