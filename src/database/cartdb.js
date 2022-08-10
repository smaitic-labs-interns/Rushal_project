const fs = require('fs/promises');
require("dotenv").config({path: "../../.env"});
const path = process.env.CART_PATH
//const path = "../../files/cart.json"

async function getCartdata (){
  const file = await fs.readFile(path ,{encoding:'utf8' })
  return JSON.parse(file);
}

async function getCartDataUpdate(cart) {
  try {
    fs.writeFile(path, JSON.stringify(cart, null, 2), (error) => {
      if (error) {
        throw error;
      }
      return true;
    });
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}
  
module.exports = {getCartdata ,getCartDataUpdate};



