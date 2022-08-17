const User = require("../database/userdb.js");
const { v4: uuidv4 } = require("uuid");
const Validate = require('./validation.js')
const Bcrypt = require('bcrypt')


const Salt = Bcrypt.genSaltSync(10);

//sign in
const login = async (email, password) => {
  try {
  if(await User.findUserFromLoginDetails(email, password)) {
    console.log("login successfull");
    return true
  }
    throw new Error("Invalid email password");
  } catch (err) {
    console.log(err.message);
  }
};
//login("rushal@gmail.com", "123456789");

//sign up

const sign_up = async (fname, lname, password, email, contact) => {
  try {
   
    const { error, value } = Validate.userValidation(
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
    
    if(await User.findUserFromEmail(value.email)){
      throw new Error("email already exist")
    }
    if (User.addUser(user)) {
      console.log("user registered");
    } else {
      throw new Error ("error occured while registering")
    }
  } catch (err) {
    console.log(err.message);
  }
};
sign_up({
  fname: "Rushal123",
  lname: "Maharjan",
  password: "123456789",
  email: "hello@gmail.com",
  contact: "9843437654",
});

