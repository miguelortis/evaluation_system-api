/**
 * Check for required fields in the request body.
 * @param {Object} body - The request body.
 * @param {Array} requiredFields - The list of required fields.
 * @returns {String|null} - Returns a message with missing fields or null if all fields are present.
 */
function checkRequiredFields(body, requiredFields) {
  const missingFields = requiredFields.filter(
    (field) => body[field] === undefined || body[field] === null
  );
  if (missingFields.length > 0) {
    throw { message: `Missing required fields: ${missingFields.join(", ")}` };
  }
  return null;
}

module.exports = {
  checkRequiredFields,
};
