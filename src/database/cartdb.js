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
  
async function addToCart(CartID, Userid, newProduct){
try{
  const allCart = await getCartdata()
  for (let Acart of allCart) {
    if (Acart.CartId === CartID) {
      for (let i of Acart.Products) {
        if (newProduct.Productid === i.id) {
          i.Quantity += newProduct.Quantity;
          return getCartDataUpdate(allCart) 
        }
      }
      Acart["Products"].push({
        id: newProduct["Productid"],
        Quantity: newProduct["Quantity"],
      });
      return getCartDataUpdate(allCart)      
    }
  }
  //  creating new cart
  carts["Products"].push({
    id: newProduct["Productid"],
    Quantity: newProduct["Quantity"],
  });
  allCart.push(carts);
  return getCartDataUpdate(allCart) 
}catch(e){
    throw e
  }
}
module.exports = {getCartdata ,getCartDataUpdate};



