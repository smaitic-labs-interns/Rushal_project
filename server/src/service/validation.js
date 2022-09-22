
const joi = require('joi')

const user_validation = (firstName, lastName, email, password, contact) => {
  // console.log(firstName, lastName, email, password, contact);

  const validation_rule = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().min(5).max(50).optional(),
    password: joi.string().min(8).max(100).required(),
    contact: joi.number(),
  });

  return validation_rule.validate({firstName, lastName, email, password, contact});
};
module.exports = {user_validation}
