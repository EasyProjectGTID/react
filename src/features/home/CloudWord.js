import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

const data = [
  { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
  { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 },
  { value: "Webpack", count: 22 }, { value: "Babel.js", count: 7 },
  { value: "ECMAScript", count: 25 }, { value: "Jest", count: 15 },
  { value: "Mocha", count: 17 }, { value: "React Native", count: 27 },
  { value: "Angular.js", count: 30 }, { value: "TypeScript", count: 15 },
  { value: "Flow", count: 30 }, { value: "NPM", count: 11 },
];

export class CloudWord extends Component {
  static propTypes = {

  };

    constructor(props) {
    super(props);

    this.state = { searchCount: [] };
  }

componentWillMount() {
    const { searchCount } = this.props.actions;


      searchCount().then(response => {
        this.setState({ searchCount: response.data });
      });
    
  }

  searchWord(value){
    const {searchAction} = this.props.actions
    searchAction(value)
  }

  render() {
    return (
      <div>
      <div className="row justify-content-md-center">Les mots les plus recherchés</div>
      <div className="row justify-content-md-center">
      
      <div className="home-cloud-word">
        <TagCloud minSize={12}
            maxSize={50}
            tags={this.state.searchCount}
            className="simple-cloud"
            shuffle={true}
            onClick={tag => this.searchWord(tag.value)} />

      </div>
      </div>
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
)(CloudWord);

