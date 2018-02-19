import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { alertError } from '../../pages/alert';
import Form from './form';
import userInfo from './../../services/user-info';
import './style.css';
import {
  UPDATE_MOVIE_FORM_DATA, MOVIE_FORM_SUBMIT,
} from './../../constants/action-types';

class New extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(fieldName, value, file = null) {
    if (file) {
      value = { path: value, file };
    }
    this.props.onChange(fieldName, value);
  }

  buildFormData() {
    const {
      name, director, image, release_date,
    } = this.props.movieFormData;
    const formData = new FormData();
    formData.append('movie[name]', name);
    formData.append('movie[release_date]', release_date);
    formData.append('movie[director]', director);
    formData.append('movie[image]', image.file, (image.file && image.file.name));
    return formData;
  }

  handleSubmit() {
    this.props.submitMovieForm(this.buildFormData(), this.props.history);
  }

  render() {
    const user = userInfo();
    if (user && user.admin) {
      return (
        <Form
          movieFormData={this.props.movieFormData}
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
        />
      );
    }
    if (user) {
      alertError('Please login with administrator privileges and try again.');
      return <Redirect to="/" />;
    }
    alertError('Please sign in first.');
    return <Redirect to="/signin" />;
  }
}

const mapStateToProps = state => ({ movieFormData: state.movieFormData });

const mapDispatchToProps = dispatch => ({
  onChange: (fieldName, value) => dispatch({ type: UPDATE_MOVIE_FORM_DATA, fieldName, value }),
  submitMovieForm: (movieFormData, history) => dispatch({
    type: MOVIE_FORM_SUBMIT, movieFormData, history,
  }),
});

New.contextTypes = {
  movieFormData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
