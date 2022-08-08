const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
//const path = "../../files/users.json"
const path = process.env.USER_PATH

async function getUserData() {
  const data = await fs.readFile(path, { encoding: "utf8" });
  return JSON.parse(data);
}

async function updateUserData(user) {
  try {
    fs.writeFile(path, JSON.stringify(user, null, 2), (error) => {
      if(error){
        throw error 
      } 
      return true;
    }); 
  } catch (e) {
    return false;
  }
}

module.exports = { getUserData, updateUserData };
