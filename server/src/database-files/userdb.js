const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
//const path = "../../files/users.json"
const path = process.env.USER_PATH
// const path = require('path')
//  let path1 =  path.resolve(__dirname ,"../../files/users.json")
const Bcrypt = require('bcrypt');


async function get_user_data() {
  const data = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(data);
}

async function update_user_data(user) {
  try {
    await fs.writeFile(path, JSON.stringify(user,null ,2))
    return true;
  } catch (e) {
    return false;
  }
}
async function add_user (user){
  try{
    const peoples = await get_user_data();
    peoples.push(user);
   return await update_user_data(peoples)
  }catch(e){
    throw e
  }
}
async function find_user_from_email (email){
  try{
  const peoples = await get_user_data();
  for (let user of peoples) {
    if (email === user.email) {
      return user;
    }
  }
  return false
}catch (e){
  throw e
}
}

async function find_user_from_login_details(email, password) {
  try {
    const peoples = await get_user_data();
    for (let i = 0; i < peoples.length; i++) {
      if (peoples[i].email === email) {
        if (Bcrypt.compareSync(password, peoples[i].password)) {
          return true;
        }
      }
    }
    throw new Error("Invalid login Credentials");
  } catch (e) {
    throw e;
  }
}
async function get_user_by_id (id){
  try{
  const peoples = await get_user_data();
    for (let i = 0; i < peoples.length; i++) {
      if(peoples[i].user_id === id){
    return peoples[i]
    }
  }
  return false
}catch(e){
  throw e
}
}


module.exports = {get_user_data, update_user_data,add_user,find_user_from_email ,find_user_from_login_details, get_user_by_id};
