const isEmpty = require('./isempty');

module.exports = function validateCurrencyInputs(data) {
    const regex  = /^\d+(?:\.\d{0,2})$/;
    console.log(regex.test(data))
    const errors = {};
    if (!regex.test(data)){
        errors.currency = 'Currency Format must be: example 10.00!'
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
