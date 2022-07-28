const User = require("../database/userdb.js");
const peoples = User.getUserdata();
const { v4: uuidv4 } = require("uuid");

//sign in
const login = (email, password) => {
  for (let i = 0; i < peoples.length; i++) {
    if (peoples[i].email === email && peoples[i].password === password) {
      console.log("login successful");
      return;
    }
  }
  console.log("invalid login details");
};
login("rushal123@gmail.com", "111");

//sign up

const signUP = (fname, lname, password, email, contact) => {
  for (let i = 0; i < peoples.length; i++) {
    if (email === peoples[i].email) {
      console.log("email already exist");
      return;
    }
  }
  const user = {
    userID: uuidv4(),
    fname: fname,
    lname: lname,
    password: password,
    email: email,
    contact: contact,
  };
  peoples.push(user);

  if (User.getUserdataupdate(peoples)) {
    console.log("user registered");
  } else {
    console.log("error");
  }
};
//signUP("rushal", "maharjan", "111", "ttaskdjasshal123@gmail.com", "9843437654");
