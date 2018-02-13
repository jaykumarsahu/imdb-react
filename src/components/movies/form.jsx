import React, { Component } from 'react';
import { Row, Col, FormGroup, Button, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const Form = ({ movieFormData, handleInput, handleSubmit }) => (
  <div className="container">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <span className="anchor" />
          <div className="card rounded-0">
            <form>
              <FormField
                fieldName="name"
                value={movieFormData.name}
                handleInput={handleInput}
              />

              <FormField
                fieldName="director"
                value={movieFormData.director}
                handleInput={handleInput}
              />

              <FormField
                fieldName="release_date"
                value={movieFormData.release_date}
                handleInput={handleInput}
              />

              <FormField
                fieldName="image"
                type="file"
                value={movieFormData.image}
                handleInput={handleInput}
                className="movie-image-field"
              />

              <Button
                className="pull-right"
                bsStyle="primary"
                onClick={handleSubmit}
              >
                  Submit
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const submitForm = (handleSubmit, movieFormData) => {

};


const movieFormData = (movieFormData) => {
  const formData = new FormData();
};


const getValidationState = (fieldName, value) => {
  switch (fieldName) {
    case 'name':
      if (value.length > 5) return 'success';
      else if (value.length > 3) return 'warning';
      else if (value.length > 0) return 'error';
      return null;
    case 'director':
      if (value.length > 5) return 'success';
      else if (value.length > 3) return 'warning';
      else if (value.length > 0) return 'error';
      return null;
    case 'release_date':
      const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (value != '' && !value.match(re)) {
        return 'error';
      }
      if (value.length > 1) return 'success';
      return null;
    case 'image':
      if (value.file) return 'success';
      return 'warning';
    default:
      return null;
  }
};

const FormField = ({
  fieldName, value, handleInput, type = 'text', className = '',
}) => {
  const isTypeFile = type == 'file';
  return (
    <Row>
      <FormGroup controlId="formBasicText" className={className} validationState={getValidationState(fieldName, value)}>
        <ControlLabel>{isTypeFile ? 'Upload' : 'Enter'} {fieldName.capitalize()}</ControlLabel>
        <FormControl
          type="text"
          type={type}
          value={isTypeFile ? value.path : value}
          onChange={e => handleInput(fieldName, e.target.value, e.target.files && e.target.files[0])}
          placeholder={`Enter ${fieldName}`}
        />
        <FormControl.Feedback />
      </FormGroup>
    </Row>
  );
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


export default Form;
