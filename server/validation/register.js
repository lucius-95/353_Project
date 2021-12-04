const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateRegisterInputs(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.firstname, { min: 2, max: 40 })) {
    errors.firstname =
        'first name needs to be between 2 and 40 characters';
  }
  if (!validator.isLength(data.lastname, { min: 2, max: 40 })) {
    errors.lastname =
        'lastname name needs to be between 2 and 40 characters';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = ' Passwords must match ';
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'confirm password field is required';
  }
  if (validator.isEmpty(data.firstname)) {
    errors.firstname = 'first name field cannot be empty';
  }
  if (validator.isEmpty(data.lastname)) {
    errors.lastname = 'last name field cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
