const User = require("../database/userdb.js");
const { v4: uuidv4 } = require("uuid");
const Validate = require('./validation.js')
const Crypto = require('crypto')

const peoples = User.getUserData();

//sign in
const login = (email, password) => {
  try {
    for (let i = 0; i < peoples.length; i++) {
      const hashPassword = Crypto.createHash("md5").update(password).digest("hex");
      if (peoples[i].email === email && peoples[i].password === hashPassword) {
        console.log("login successful");
        return;
      }
    }
    throw new Error("Invalid email password");
  } catch (err) {
    console.log(err.message);
  }
};
//login("maharjan@gmail.com", "rushal123");

//sign up

const signUP = (fname, lname, password, email, contact) => {
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
    for (let i = 0; i < peoples.length; i++) {
      if (value.email === peoples[i].email) {
        throw new Error("email already exist");
      }
    }
    const user = {
      userID: uuidv4(),
      fname: value.fname,
      lname: value.lname,
      password: Crypto.createHash('md5').update(value.password).digest("hex"),
      email: value.email,
      contact: value.contact,
    };
    peoples.push(user);

    if (User.updateUserData(peoples)) {
      console.log("user registered");
    } else {
      throw new Error ("error occured while registering")
    }
  } catch (err) {
    console.log(err.message);
  }
};
signUP({
  fname: "rushal",
  lname: "maharjan",
  password: "123456789",
  email: "tanisha@gmail.com",
  contact: "9843437654",
});

