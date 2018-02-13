import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { alertSuccess } from '../../pages/alert';
import Form from './form';
import { submitNewMovie } from '../../actions';
import './style.css';

class New extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = { loading: false };
    this.props.flushState();
  }

  handleInput(fieldName, value, file = null) {
    if (file) { value = { path: value, file }; }
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

  async handleSubmit() {
    const response = await submitNewMovie(this.buildFormData());
    if (response) {
      this.props.history.push('/');
      alertSuccess('Movie has saved successfully.');
    }
  }

  render() {
    return (
      <Form
        movieFormData={this.props.movieFormData}
        handleSubmit={this.handleSubmit}
        handleInput={this.handleInput}
      />
    );
  }
}

const mapStateToProps = state => ({ movieFormData: state.movieFormData });

const mapDispatchToProps = dispatch => ({
  onChange: (fieldName, value) => dispatch({ type: 'UPDATE_MOVIE_DATA', fieldName, value }),
  flushState: () => dispatch({ type: 'FLUSH_MOVIE_DATA' }),
});

New.contextTypes = {
  movieFormData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
