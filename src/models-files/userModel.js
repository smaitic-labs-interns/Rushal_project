const Bcrypt = require('bcrypt')
const Validate = require('../service/validation.js')
const {v4:uuidv4} = require('uuid')
   const User = ({fname:fname , lname:lname, password:password, email:email, contact:contact}) =>{

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
        user_id: uuidv4(),
        fname: value.fname,
        lname: value.lname,
        password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
        email: value.email,
        contact: value.contact,
      };
   }
      module.exports = {User}