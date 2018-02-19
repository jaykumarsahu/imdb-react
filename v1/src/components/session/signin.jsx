import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isUserLoggedIn } from './../../services/user-info';
import { alertError } from '../../pages/alert';
import LoginForm from './login-form';
import {
  UPDATE_SESSION_FORM_DATA, REQUEST_FOR_SESSION,
} from './../../constants/action-types';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(fieldName, value) {
    this.props.onChange(fieldName, value);
  }

  handleSubmit() {
    const credentials = { ...this.props.loginData };
    this.props.submitLoginData(credentials, this.props.history);
  }

  render() {
    if (isUserLoggedIn()) {
      alertError('User has already signed in.');
      return <Redirect to="/" />;
    }

    const { email, password } = this.props.loginData;
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-white mb-4">Login</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <span className="anchor" />
                <div className="card rounded-0">
                  <LoginForm
                    email={email}
                    password={password}
                    handleInput={this.handleInput}
                    handleSubmit={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loginData: state.loginData });

const mapDispatchToProps = dispatch => ({
  onChange: (fieldName, value) => dispatch({ type: UPDATE_SESSION_FORM_DATA, fieldName, value }),
  submitLoginData: (credentials, history) => dispatch({
    type: REQUEST_FOR_SESSION, credentials, history,
  }),
});

SignIn.contextTypes = {
  loginData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
