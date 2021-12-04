const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateProfileInputs(data) {
  const errors = {};
  data.profileusername = !isEmpty(data.profileusername)
    ? data.profileusername
    : '';
  if (!validator.isLength(data.profileusername, { min: 2, max: 40 })) {
    errors.profileusername =
      'profileusername needs to be between 2 and 40 characters';
  }

  if (!isEmpty(data.githubusername)) {
    if (!validator.isURL(data.githubusername)) {
      errors.githubusername = 'not a valid  website URL';
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'not a valid youtube URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'not a valid twitter URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'not a valid facebook URL';
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'not a valid linkedin URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'not a valid  instagram URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
