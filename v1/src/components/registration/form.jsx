import React from 'react';

const FormField = ({
  fieldName, userFormData, handleInput, type = 'text',
}) => (
  <div className="col-md-6 form-group">
    <label>{fieldName}</label>
    <input
      type={type}
      className="form-control form-control-lg rounded-0"
      value={userFormData[fieldName]}
      onChange={e => handleInput(fieldName, e.target.value)}
    />
  </div>
);

export const form = props => (
  <div className="card-body">
    <div className="row">
      <FormField
        fieldName="first_name"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
      <FormField
        fieldName="last_name"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
    </div>

    <div className="row">
      <FormField
        fieldName="email"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />

      <FormField
        fieldName="phone"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
    </div>

    <div className="form-group">
      <label>Address</label>
      <textarea
        className="form-control form-control-lg rounded-0"
        value={props.address}
        onChange={e => props.handleInput('address', e.target.value)}
      />
    </div>

    <div className="row">

      <FormField
        fieldName="city"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
      <FormField
        fieldName="state"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
    </div>

    <div className="row">

      <FormField
        fieldName="zip"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
      <FormField
        fieldName="country"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
      />
    </div>

    <div className="row">
      <FormField
        fieldName="password"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
        type="password"
      />
      <FormField
        fieldName="password_confirmation"
        userFormData={props.userFormData}
        handleInput={props.handleInput}
        type="password"
      />
    </div>

    <div
      className="btn btn-success btn-lg float-right"
      onClick={props.handleSubmit}
    >Save
    </div>
  </div>
);

export default form;
