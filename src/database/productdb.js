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
    fs.writeFile(path, JSON.stringify(product, null, 2), (error) => {
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
async function getProductById(id) {
  try {
    const allproduct = await getProductdata();
    return allproduct.filter((product) => product.product_id === id);
  } catch (e) {
    console.log(e.message);
  }
}
async function addProduct (product){
  try{
    const allProduct = await getProductdata ()
    allProduct.push(product)
    return updateProductData(allProduct)
  }catch(e){
    throw e
  }
}

async function findProductFromData (keyword) {
try{
  const allProduct = await getProductdata()
  const result = [];
    for (let product of allProduct) {
      for (key in product) {
        if(key === "product_id" || key === "brand"){
          continue
        }else{
        if (typeof product[key] === "string" && typeof keyword === "string") {
          if (product[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            result.push(product);
            break;
          }
        }
      }
      }
    }
    return result;

}catch(e){
  console.log(e.message);
}

}

async function removeProductFromData (id){
try{
  const allProduct = await getProductdata()
  var i = 0
  for (let Product of allProduct) {
    if (Product.product_id === id) {
      allProduct.splice(i,1)
      if (updateProductData(allProduct)) {
        return true;
      } 
    }
    i +=1
  }
  throw new Error("error occur while saving on database");
}catch(e){
throw e
}
}

async function updateProductFromData(id , productinfo){
  try{
    const allProduct = await getProductdata()
    for (let Product of allProduct) {
      if (Product.product_id === id) {
        for (let key in productinfo) {
          Product[key] = productinfo[key];
        }
        if (updateProductData(allProduct)) {
          return true;
        }
  }
}
return false;
  }catch (e){
    throw e
  }
}
async function checkingProduct(productid){
  try {
      const allProduct = await getProductdata()
    for (var product of allProduct) {
      if (product.product_id === productid) {
        return product;
      }
    }
    throw new Error("no product found for id:" + productid);
  } catch (e) {
    throw e;
  }
};
async function updateQuantity(id , quantity) {

  const allProduct = await getProductdata()
  for(product of allProduct){
      if (product.product_id === id){
          product.Quantity -= quantity
      }
  }
  if(updateProductData(allProduct)){
      return true
  }else{
      console.log("error Occured");
  }
  }

module.exports = {
  getProductdata,
  updateProductData,
  getProductById,
  addProduct,
  findProductFromData,
  removeProductFromData,
  updateProductFromData,
  checkingProduct,
  updateQuantity
};
