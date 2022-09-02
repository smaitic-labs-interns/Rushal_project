const fs = require('fs/promises');
require("dotenv").config({path: "../../.env"});
const path = process.env.CART_PATH
//const path = "../../files/cart.json"

async function get_cart_data (){
  const file = await fs.readFile(path ,{encoding:'utf8' })
  return JSON.parse(file);
}

async function update_cart(cart) {
  try {
    await fs.writeFile(path, JSON.stringify(cart,null ,2))
    return true;
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}
  
async function update_cart_data(cart){
  try{
    const allCart = await get_cart_data();
    for(let Acart of allCart){
      if(Acart.CartId === cart.CartId){
        allCart[allCart.indexOf(Acart)] = cart;
        return update_cart(allCart)
      }
    }
  }catch(e){
    throw e
  }
}

async function get_active_cart_data(userid){
  try{
  const allCart = await get_cart_data()
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
async function add_to_cart (cart){
  try {
  const allCart = await get_cart_data()
  allCart.push(cart)
  return update_cart(allCart);
}catch(e){
throw e
}
}
async function update_quantity_from_cart(userid, productid, quantity) {
  try {
    const allCart = await get_cart_data();
    for (let oldCart of allCart) {
      if (oldCart.UserId === userid) {
        for (var product of oldCart.Products) {
          if (product.id === productid) {
            product.Quantity = quantity;
            if (update_cart(allCart)) {
              return true;
            }
          }
        }
        return false;
      }
    }
    throw new Error("no user found for id:" + userid);
  } catch (e) {
    throw e;
  }
}

async function remove_product_from_cart(userid , productid){
  try{
    const allCart = await get_cart_data();
    var i = 0
    for(oldCart of allCart) {
      if(oldCart.UserId === userid){
     for(let product of oldCart.Products){
      if(product.id === productid){ 
        oldCart.Products.splice(i,1) 
        if(update_cart(allCart)){
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
async function find_cart (cartId) {
  try{
      const allCart = await get_cart_data()
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

async function deactive_cart(cartid){
  try{
  const allCart = await get_cart_data()
  for(let cart of allCart){
    if(cart.UserId === cartid){
    cart.status = "deactive"
    // console.log(cart);
    return update_cart(allCart)
    }
  }
  return false
}catch(e){
  throw e
}
}


module.exports = {
  get_cart_data,
  update_cart,
  update_cart_data,
  get_active_cart_data,
  add_to_cart,
  update_quantity_from_cart,
  remove_product_from_cart,
  find_cart,
  deactive_cart
};



