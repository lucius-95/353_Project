/**
 * function isEmpty to check data whethere is undefined, null, empty or not
 * @param {*} value :data
 * @returns true or false
 */
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
