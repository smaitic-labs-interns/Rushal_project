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
  
async function updateCartData(userid ,cart){
  try{
    const allCart = await getCartdata();
    for(let Acart of allCart){
      if(Acart.UserId === userid){
        allCart[allCart.indexOf(Acart)] = cart;
        return getCartDataUpdate(allCart)
      }
    }
  }catch(e){
    throw e
  }
}

async function getActiveCartdata(userid){
  try{
  const allCart = await getCartdata()
  for(let cart of allCart){
    if(cart.UserId === userid && cart.status ==="active"){
      return cart
    }
  }
  return false
}catch(e){
  throw e
}
}
async function addToCart (cart){
  try {
  const allCart = await getCartdata()
  allCart.push(cart)
  return getCartDataUpdate(allCart);
}catch(e){
throw e
}
}
async function updateQuantityFromCart(cartid, productid, quantity) {
  try {
    const allCart = await getCartdata();
    for (let oldCart of allCart) {
      if (oldCart.CartId === cartid) {
        for (var product of oldCart.Products) {
          if (product.id === productid) {
            product.Quantity = quantity;
            if (getCartDataUpdate(allCart)) {
              return true;
            }
          }
        }
        return false;
      }
    }
    throw new Error("no Cart found for id:" + cartid);
  } catch (e) {
    throw e;
  }
}

async function removeProductFromCart(cartid , productid){
  try{
    const allCart = await getCartdata();
    var i = 0
    for(oldCart of allCart) {
      if(oldCart.CartId === cartid){
     for(let product of oldCart.Products){
      if(product.id === productid){ 
        oldCart.Products.splice(i,1) 
        if(getCartDataUpdate(allCart)){
          return true;
        }
      }  
      i += 1 
     }
      }
      return false;
    }
    throw new Error("error occured")
  }catch(e){
    throw e
  }
}
async function findCart (cartId) {
  try{
      const allCart = await getCartdata()
      for(cart of allCart){
          if(cart.CartId === cartId){
              return cart;
          }
      }
      throw new Error("no cart found for id :" + cartId)
  }catch(e){
      throw e
  }
}

module.exports = {
  getCartdata,
  getCartDataUpdate,
  updateCartData,
  getActiveCartdata,
  addToCart,
  updateQuantityFromCart,
  removeProductFromCart,
  findCart
};



