
const joi = require('joi')

const user_validation = (fname, lname, email, password, contact) => {
  const validation_rule = joi.object({
    fname: joi.string().required(),
    lname: joi.string().required(),
    email: joi.string().email().min(5).max(50).optional(),
    password: joi.string().min(8).max(100).required(),
    contact: joi.number(),
  });

  return validation_rule.validate(fname, lname, email, password, contact);
};
module.exports = {user_validation}
