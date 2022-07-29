const fs = require("fs");

function getUserData() {
  const data = fs.readFileSync("../../files/users.json", { encoding: "utf8" });
  return JSON.parse(data);
}

function updateUserData(user) {
  try {
    fs.writeFileSync("../../files/users.json", JSON.stringify(user, null, 2));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = { getUserData, updateUserData };
