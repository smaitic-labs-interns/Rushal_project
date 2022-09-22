const User = require("../database/userdb"); 
// const { v4: uuidv4 } = require("uuid");
const Schema = require('../models/userModel');

//sign in
const login = async (email, password) => {
  try {
  const data = await User.find_user_from_login_details(email, password)
  console.log(data);
  return data
  } catch (err) {
    console.log(err.message);
    throw err
  }
};
// login("rushal123@gmail.com", "123456789");

//sign up

const sign_up = async (fname, lname, password, email, contact) => {
  try {
    console.log(fname);
    const user = Schema.User(fname, lname, email, password,  contact);
    // console.log(user);
    if (await User.find_user_from_email(user.email)) {
      throw new Error("email already exist");
    }
    if (await User.add_user(user)) {
     console.log("user registered");
     return "user registered"
    } else {
      throw new Error("error occured while registering");
    }
  } catch (err) {
    console.log(err.message);
    throw err
  }
};
// sign_up({
//   fname: "Rushal123",
//   lname: "Maharjan",
//   password: "123456789",
//   email: "hell@gmail.com",
//   contact: "9843437654",
// });


module.exports = {
  login , sign_up}

