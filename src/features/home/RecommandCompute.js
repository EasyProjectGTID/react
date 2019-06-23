import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './Footer';
import Resultat from './Resultat';
class Recommand extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = { series: {}, like: [], dislike: [] };
    this.handleChange = this.handleChange.bind(this);
    this.removeByValue = this.removeByValue.bind(this);
  }

  removeByValue(arr, value) {
    /*for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      }
    }
    return arr;*/
    return arr.filter(v => v !== value)
  }

  handleChange(pk, action, isLiked, isDisliked) {
    var series = Object.assign({}, this.state.series);
    const toUpdate = action === 'like' ? {likeChecked: true, dislikeChecked: false} : {likeChecked: false, dislikeChecked: true}
    series[pk] = Object.assign(series[pk], toUpdate)

    this.setState({series})

  /*if (event.target.name === 'likeChecked') {
      console.log('Jai coché like')
      if (series[event.target.value]['dislikeChecked'] === !event.target.value) {
        console.log('Je passe ici car dans mon state jai dislikeChecked qui est égale à linverse de la valeur coché')
        series[event.target.value][event.target.name] = event.target.checked;
        if (event.target.checked === true) {
          console.log('toto3')
          this.setState({ like: [...this.state.like, event.target.value] });
        } else {
          console.log('toto4')
          let nv = this.state.like;
          let newLike = this.removeByValue(nv, event.target.value);
          this.setState({ like: newLike });
        }
     
      } else {
        console.log('toto5')
        series[event.target.value][event.target.name] = event.target.checked;
        series[event.target.value]['dislikeChecked'] = !event.target.checked;
        let newdisLike = this.state.dislike;
        let newD = this.removeByValue(newdisLike, event.target.value);
        this.setState({ series: series, dislike: newD, like: [...this.state.like, event.target.value] });
      }
    } else {
      console.log('toto6');
      if (series[event.target.value]['likeChecked'] === !event.target.value) {
        console.log('toto7')
        series[event.target.value][event.target.name] = event.target.checked;
        if (event.target.checked === true) {
          console.log('toto8')
          this.setState({ dislike: [...this.state.dislike, event.target.value] });
        } else {
          console.log('toto9')
          let nv = this.state.dislike;
          let newdisLike = this.removeByValue(nv, event.target.value);
          this.setState({ dislike: newdisLike });
        };
      } else {
        console.log('toto10')
        series[event.target.value][event.target.name] = event.target.checked;
        series[event.target.value]['likeChecked'] = !event.target.checked;
        let newLike = this.state.like;
        let newD = this.removeByValue(newLike, event.target.value);
        this.setState({ series: series, like: newD,  dislike: [...this.state.dislike, event.target.value]});
      }
    }*/
  }

  componentWillMount() {
    const { getAllSerie } = this.props.actions;
    getAllSerie().then(response => {
      let newObject = [];
      response.data.map(
        item =>
          (newObject[item.pk] = { name: item.name, likeChecked: false, dislikeChecked: false }),
      );
      this.setState({ series: newObject });
    });
  }

  render() {
    const {resultatCompute} = this.props.home
    const { allSeries } = this.props.home;
    if(resultatCompute.length === 0){

    
    return (
      <div className="home-recommand  ">
        <div
          className="row header justify-content-md-center fixed-top"
          style={{ 'margin-top': '5%' }}
        >
          <div className="col-md-2">
            <FontAwesomeIcon
              className="icon-vote"
              icon={faThumbsUp}
              size="4x"
              color="green"
              onClick={() => {
                this.formatToPost(this.props.movie.pk, '1');
              }}
            />
          </div>
          <div className="col-md-4 centre" />
          <div className="col-md-2">
            <FontAwesomeIcon className="icon-vote" icon={faThumbsDown} size="4x" color="red" />{' '}
          </div>
        </div>
        {Object.keys(this.state.series).map((item, i) => (
          <div className="row justify-content-md-center" key={i}>
            <div className="col-md-2">
              <div className="toto form-check form-check-inline">
                <input
                  type="checkbox"
                  value={item}
                  className="form-control"
                  name="likeChecked"
                  checked={this.state.series[item].likeChecked}
                  onClick={() => this.handleChange(item, 'like', this.state.series[item].likeChecked, this.state.series[item].dislikeChecked)}
                />
              </div>
            </div>
            <div className="col-md-4 centre">
              <div className="name">{this.state.series[item]['name']}</div>
            </div>
            <div className="col-md-2">
              <div className="toto form-check form-check-inline">
                <input
                  type="checkbox"
                  value={item}
                  name="dislikeChecked"
                  className="form-control"
                  checked={this.state.series[item].dislikeChecked}
                  onClick={() => this.handleChange(item, 'dislike', this.state.series[item].likeChecked, this.state.series[item].dislikeChecked)}
                />
              </div>
            </div>
          </div>
        ))}
        <Footer like={this.state.like} dislike={this.state.dislike} series={this.state.series} />
      </div>
    );} else{
      return(<div><Resultat /></div>)
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
)(Recommand);
