const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
//const path = "../../files/product.json"
const path = process.env.PRODUCT_PATH

async function getProductdata() {
  const file = await fs.readFile(path, {encoding: "utf8",});
  return JSON.parse(file);
}

async function updateProductData(product) {
  try {
    fs.writeFile(path, JSON.stringify(product, null, 2), (error) =>{
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
async function getProductById (id){
  try{
    const allproduct = await getProductdata();
    return allproduct.filter((product) => product.product_id === id) 
  }catch(e){
    console.log(e.message);
  }
}

module.exports = { getProductdata, updateProductData, getProductById };
