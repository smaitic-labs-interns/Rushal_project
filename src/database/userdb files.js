const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
//const path = "../../files/users.json"
const path = process.env.USER_PATH
const Bcrypt = require('bcrypt')

async function getUserData() {
  const data = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(data);
}

async function updateUserData(user) {
  try {
    fs.writeFile(path, JSON.stringify(user, null, 2), (error) => {
      if (error) {
        throw error;
      }
      return true;
    });
  } catch (e) {
    return false;
  }
}
async function addUser (user){
  try{
    const peoples = await getUserData();
    peoples.push(user);
   return updateUserData(user)
  }catch(e){

  }
}
async function findUserFromEmail (email){
  try{
  const peoples = await getUserData();
  for (let i = 0; i < peoples.length; i++) {
    if (email === peoples[i].email) {
      return true
    }
  }
  return false
}catch (e){
  throw e
}
}

async function findUserFromLoginDetails (email, password){
  const peoples = await getUserData();
    for (let i = 0; i < peoples.length; i++) {
      if(peoples[i].email === email){
      if (Bcrypt.compareSync(password, peoples[i].password)){
        return true
      }
    }
  }
  return false
}


module.exports = { getUserData, updateUserData,addUser,findUserFromEmail ,findUserFromLoginDetails };
