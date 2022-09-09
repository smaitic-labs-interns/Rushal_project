const Bcrypt = require('bcrypt')
const Validate = require('../service/validation.js')

   const User = (fname , lname , password, email, contact) =>{
    const { error, value } = Validate.user_validation(
        fname,
        lname,
        password,
        email,
        contact
      );

    if(error) {
    throw error
    }
    return {
        fname: value.fname,
        lname: value.lname,
        password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
        email: value.email,
        contact: value.contact,
      };
   }
      module.exports = {User}