const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateBookInputs(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : 'unknown';
  data.author = !isEmpty(data.author) ? data.password : 'unknown';

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
