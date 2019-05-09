import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'reactstrap';
import PosterComponent from '../home/PosterComponent';

export class MesVotes extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { resultat: [], myVote: [] };

  }

  componentWillMount() {
    const { getMyVoteCompute, getMyUserVote } = this.props.actions;
    const { showDetails } = this.props.home;

    getMyUserVote().then(response => {
      this.setState({ myVote: response.data });
    });

    if (showDetails === null) {
      getMyVoteCompute().then(response => {
        this.setState({ resultat: response.data });
      });
    }
  }

  handleClick(pk){
    const {deleteVote} = this.props.actions
    deleteVote(pk)
    const newState = this.state.myVote
    const newS = newState.filter(v => v.pk !== pk)
    this.setState({myVote: newS})

  }

  render() {
    const { showDetails } = this.props.home;
    if (showDetails === null) {
      return (
        <div className="container mes-votes">
          <div className="row justify-content-center fond-dark">
              <div className="col-8 mx-auto">
              {this.state.myVote.map((item, i) => (
                
               
                <div className="row justify-content-center">
                <div className="col-10">
           
                    Le {item.date} vous avez voté 
                  {(() => {
                    switch (item.vote) {
                      case '1':
                        return <FontAwesomeIcon className="iconeMesVote" icon={faThumbsUp} size="1x" color="green" />;
                      case '0':
                        return <FontAwesomeIcon className="iconeMesVote" icon={faThumbsDown} size="1x" color="red" />;
                     
                      default:
                        return '#FFFFFF';
                    }
                  })()}
             
                   sur la serie {item.name}</div>
                   <div className="col-1">
                 <FontAwesomeIcon className="iconeMesVote bean" onClick={() => this.handleClick(item.pk)} icon={faTrash} size="1x" color="orange" /></div>
             <div className="separateur"></div>
              
              </div>
        
              ))}
            </div>
          </div>
          
          
         <div className="row justify-content-center title"> Nous vous recommandons en fonction de vos vote</div>
          <Row className="row justify-content-center ">
            {this.state.resultat.map((item, i) => (
              <Col className="col-md-2 col-md-pull-15" id={item.name}>
                <PosterComponent movie={item} />
              </Col>
            ))}
          </Row>
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
)(MesVotes);
