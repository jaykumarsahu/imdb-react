import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import API from '../../services/api';
import AJAX from '../../services/ajax';
import Form from './form';
import { alertError, alertSuccess } from '../../pages/alert';
import { isUserLoggedIn } from './../../services/user-info';
import { START_LOADING, STOP_LOADING, UPDATE_USER_FORM_DATA } from './../../constants/action-types';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(fieldName, value) {
    this.props.onChange(fieldName, value);
  }

  async handleSubmit() {
    const url = API.registrationUrl;
    const data = { user: { ...this.props.userFormData } };
    this.props.START_LOADING();
    const response = await AJAX.post(url, data);
    this.props.STOP_LOADING();
    if (response && response.status === 'SUCCESS') {
      this.props.history.push('/signin');
      alertSuccess('User has been created successfully. \nPlease sign in here.');
    }
    if (response && response.status === 'FAILED') { alertError(response.error); }
  }

  render() {
    if (isUserLoggedIn()) {
      alertError('User has already signed in.');
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-white mb-4">Sign Up</h2>
            <div className="row">
              <div className="col-md-12 mx-auto">
                <span className="anchor" />
                <div className="card rounded-0">
                  <Form
                    component={this}
                    handleInput={this.handleInput}
                    handleSubmit={this.handleSubmit}
                    userFormData={this.props.userFormData}
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

const mapStateToProps = state => ({ userFormData: state.userFormData, loading: state.loading });

const mapDispatchToProps = dispatch => ({
  onChange: (fieldName, value) => dispatch({ type: UPDATE_USER_FORM_DATA, fieldName, value }),
  START_LOADING: () => dispatch({ type: START_LOADING }),
  STOP_LOADING: () => dispatch({ type: STOP_LOADING }),
});

Registration.contextTypes = {
  userFormData: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

