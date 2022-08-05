const User = require("../database/userdb.js");
const { v4: uuidv4 } = require("uuid");
const Validate = require('./validation.js')
const Bcrypt = require('bcrypt')


const Salt = Bcrypt.genSaltSync(10);

//sign in
const login = async (email, password) => {
  try {
    const peoples = await User.getUserData();
    for (let i = 0; i < peoples.length; i++) {
      if (peoples[i].email === email && Bcrypt.compareSync(password, peoples[i].password)){
        console.log("login successful");
        return;
      }
    }
    throw new Error("Invalid email password");
  } catch (err) {
    console.log(err.message);
  }
};
login("hello@gmail.com", "123456789");

//sign up

const signUP = async (fname, lname, password, email, contact) => {
  try {
    const peoples = await User.getUserData();
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
    for (let i = 0; i < peoples.length; i++) {
      if (value.email === peoples[i].email) {
        throw new Error("email already exist");
      }
    }
    const user = {
      userID: uuidv4(),
      fname: value.fname,
      lname: value.lname,
      password: Bcrypt.hashSync(value.password, Salt),
      email: value.email,
      contact: value.contact,
    };
    peoples.push(user);

    if (await User.updateUserData(peoples)) {
      console.log("user registered");
    } else {
      throw new Error ("error occured while registering")
    }
  } catch (err) {
    console.log(err.message);
  }
};
signUP({
  fname: "any",
  lname: "maharjan",
  password: "123456789",
  email: "you@gmail.com",
  contact: "9843437654",
});

