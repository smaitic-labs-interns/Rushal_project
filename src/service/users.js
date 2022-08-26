const User = require("../database/userdb"); 
// const { v4: uuidv4 } = require("uuid");
const Schema = require('../models/userModel');

//sign in
const login = async (email, password) => {
  try {
  if( await User.find_user_from_login_details(email, password)) {
    console.log("login successfull");
    return true;
  }
  } catch (err) {
    console.log(err.message);
  }
};
login("rus123@gmail.com", "123456789");

//sign up

const sign_up = async (fname, lname, password, email, contact) => {
  try {
    const user = Schema.User({fname, lname, password, email, contact});
    if (await User.find_user_from_email(user.email)) {
      throw new Error("email already exist");
    }
    if (User.add_user(user)) {
      console.log("user registered");
    } else {
      throw new Error("error occured while registering");
    }
  } catch (err) {
    console.log(err.message);
  }
};
// sign_up({
//   fname: "Rushal123",
//   lname: "Maharjan",
//   password: "123456789",
//   email: "rus123@gmail.com",
//   contact: "9843437654",
// });

