const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateLoginInputs(data) {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (!validator.isEmail(data.email)) {
    errors.email = 'input is not an email type';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field cannot be empty';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'password field cannot be empty';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};
