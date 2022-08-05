const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const path = "../../files/product.json"

async function getProductdata() {
  const file = await fs.readFile(path, {encoding: "utf8",});
  return JSON.parse(file);
}

async function updateProductData(product) {
  try {
    fs.writeFile( "../../files/product.json", JSON.stringify(product, null, 2), (error) =>{
    if (error){
      throw error
    }
    return true
    });
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}

module.exports = { getProductdata, updateProductData };
