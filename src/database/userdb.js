const fs = require("fs");

function getUserData() {
  const data = fs.readFileSync("../../files/users.json", { encoding: "utf8" });
  return JSON.parse(data);
}

async function updateUserData(user) {
  try {
    fs.writeFile("../../files/users.json", JSON.stringify(user, null, 2), (error) => {
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
