const User = require("../database/userdb_files");
const { v4: uuidv4 } = require("uuid");
const Validate = require('./validation.js')
const Bcrypt = require('bcrypt')


const Salt = Bcrypt.genSaltSync(10);

//sign in
const login = async (email, password) => {
  try {
  if( await User.find_user_from_login_details(email, password)) {
    console.log("login successfull");
    return true
  }
    throw new Error("Invalid email password");
  } catch (err) {
    console.log(err.message);
  }
};
login("1234@gmail.com", "123456789");

//sign up

const sign_up = async (fname, lname, password, email, contact) => {
  try {
   
    const { error, value } = Validate.user_validation(
      fname,
      lname,
      password,
      email,
      contact
    );
    if (error) {
      throw error;
    }
    
    const user = {
      userID: uuidv4(),
      fname: value.fname,
      lname: value.lname,
      password: Bcrypt.hashSync(value.password , Salt),
      email: value.email,
      contact: value.contact,
    };
    
    if(await User.find_user_from_email(value.email)){
      throw new Error("email already exist")
    }
    if (User.add_user(user)) {
      console.log("user registered");
    } else {
      throw new Error ("error occured while registering")
    }
  } catch (err) {
    console.log(err.message);
  }
};
// sign_up({
//   fname: "Rushal123",
//   lname: "Maharjan",
//   password: "123456789",
//   email: "rus@gmail.com",
//   contact: "9843437654",
// });

