import TextField from '@material-ui/core/TextField';
import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  const { input, label, defaultValue, meta: { touched, error }, ...custom } = props;
  
  return (
    <TextField
      error={error? true: false}
      helperText={touched && error}
      label={label}
      {...input}
      {...custom}
    />
  )
}

export default FormField;