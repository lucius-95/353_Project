const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateCompanyInputs(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  if (validator.isEmpty(data.name)) {
    errors.name = 'name field cannot be empty';
  }
  if (validator.isEmpty(data.description)) {
    errors.description = 'description field cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
