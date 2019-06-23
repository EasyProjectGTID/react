import React, { Component } from 'react';
import { TagCloud } from 'react-tagcloud';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';



export class CloudWord extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = { searchCount: [], mostLiked: [] };
  }

  componentWillMount() {
    const { searchCount, getMostLiked } = this.props.actions;

    searchCount().then(response => {
      this.setState({ searchCount: response.data });
    });
    getMostLiked().then(response => {
      this.setState({ mostLiked: response.data });
    });
  }

  searchWord(value) {
    const { searchAction, searchTextUpdate } = this.props.actions;
    searchTextUpdate(value)
    searchAction(value);
  }

 
  render() {
 
    const { showDetails } = this.props.home;
    const {clickSerieDetails} = this.props.actions
    if (showDetails === null) {
      return (
        <div>
          <div className="row justify-content-md-center titre">Les mots les plus recherchés</div>
          <div className="row justify-content-md-center">
            <div className="home-cloud-word">
              <TagCloud
                minSize={13}
                maxSize={55}
                tags={this.state.searchCount}
                className="simple-cloud"
                shuffle={true}
                onClick={tag => this.searchWord(tag.value)}
              />
            </div>
          </div>
          <div className="separateurCloudWord" />
          <div className="row justify-content-md-center titre">Les series les plus aimées</div>
          <div className="row justify-content-md-center">
            <div className="home-cloud-word">
              <TagCloud
                minSize={15}
                maxSize={65}
                tags={this.state.mostLiked}
                className="simple-cloud"
                shuffle={true}
                onClick={tag => clickSerieDetails(tag)}
              />
            </div>
          </div>
      
        </div>
       
      );
    } else {
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
)(CloudWord);
