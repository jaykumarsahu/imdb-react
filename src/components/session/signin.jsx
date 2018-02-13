import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from './login-form';
import { alertError, alertSuccess } from '../../pages/alert';
import { isUserLoggedIn } from './../../services/user-info';
import { Redirect } from 'react-router';
import { UPDATE_SESSION_FORM_DATA, REQUEST_FOR_SESSION } from './../../constants/action-types';

import API from '../../services/api';
import AJAX from '../../services/ajax';
import { submitLoginForm } from '../../actions/session';

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
    const data = { ...this.props.loginData };
    console.log('___________', this.props.submitloginData(data, this.props.history));
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
  clearloginData: () => dispatch({ type: CLEAR_SESSION_FORM_DATA }),
  submitloginData: (data, history) => dispatch({ type: REQUEST_FOR_SESSION, data, history }),
});

SignIn.contextTypes = {
  loginData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
