import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Row, Col } from 'reactstrap';
import Slider from 'react-slick';
import PosterComponent from './PosterComponent';

export class LastRecent extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { lastR: [] };
  }

  componentDidMount() {
    const { getRecentSerie } = this.props.actions;
   

    getRecentSerie().then(response => {
      this.setState({ lastR: response.data });
    });
  }

  render() {
    var settings = {
      dots: true,

      infinite: true,
      speed: 250,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,

      autoplaySpeed: 2000,
      cssEase: 'linear',
    };
    const { showDetails } = this.props.home;

    if (showDetails == null) {
      return (
        <div className="div-container container">
          <Row className=" testSerie justify-content-center align-self-center">
            Nos dernière series
          </Row>
          <Slider className="slider" {...settings}>
            {this.state.lastR.map((item, i) => (
              <Col className="col-md-8 offset-md-2" key={i} >
                <PosterComponent movie={item}  />
                {/*<img
                  className="img-recommandation"
                  onClick={() => clickSerieDetails(item)}
                  alt=""
                  src={item.infos.Poster}
                />*/}
              </Col>
            ))}
          </Slider>
          {/*<Row>
            {this.state.lastR.map((item, i) => (
              <Col className="col-2">
                <b>{item.name}</b>
                <PosterComponent movie={item}/>
                {/*<img
                  className="img-recommandation"
                  onClick={() => clickSerieDetails(item)}
                  alt=""
                  src={item.infos.Poster}
                />}
              </Col>
            ))}
          </Row>*/}
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
)(LastRecent);
