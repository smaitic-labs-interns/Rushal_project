const Bcrypt = require('bcrypt')
const Validate = require('../service/validation.js')

   const User = (fname , lname , email, password,  contact) =>{
    const { error, value } = Validate.user_validation(
        fname,
        lname,
        email,
        password,
        contact
      );
      console.log(value);
      console.log(error);
    if(error) {
    throw error
    }
    return {
        fname: value.firstName,
        lname: value.lastName,
        password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
        email: value.email,
        contact: value.contact,
        role : "user"
      };
   }
      module.exports = {User}