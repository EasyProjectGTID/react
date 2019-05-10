import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
export class SignOrConnectModal extends Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    const { modalSignOrConnect } = this.props.home;
    this.setState({ show: modalSignOrConnect });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.home.modalSignOrConnect) {
      //Perform some operation

      this.setState({ show: nextProps.home.modalSignOrConnect });
    }
  }

  handleClose() {
    const { openModalSignOrConnect } = this.props.actions;
    openModalSignOrConnect(false);
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const {baseApiUrl} = this.props.home
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Connexion / Inscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-md-center">Oups !!!</Row>{' '}
            <Row className="justify-content-md-center">
              Afin de voter, veuillez vous connecter ou vous inscrire
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button variant="warning"><a href={baseApiUrl + "register"}>Inscription</a></Button>
            </Col>
            <Col />
            <Col>
              <Button variant="warning"><a href={baseApiUrl + "login"}>Connexion</a></Button>
            </Col>
          </Modal.Footer>
        </Modal>
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
)(SignOrConnectModal);
