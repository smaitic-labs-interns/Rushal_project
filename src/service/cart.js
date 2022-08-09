const cart = require('../database/cartdb')
const {getProductdata} = require ('../database/productdb')
const {v4 : uuidv4} = require('uuid')


const addto_cart = async (CartID, Userid, newProduct) => {
  try {
    //assuming customer already have cart created
    const allCart = await cart.getCartdata()
    for (let Acart of allCart) {
      if (Acart.CartId === CartID) {
        for (let i of Acart.Products) {
          if (newProduct.Productid === i.id) {
            i.Quantity += newProduct.Quantity;
            if (cart.getCartDataUpdate(allCart)) {
              console.log("data added to cart");
              return;
            }
          }
        }
        Acart["Products"].push({
          id: newProduct["Productid"],
          Quantity: newProduct["Quantity"],
        });
        if (cart.getCartDataUpdate(allCart)) {
          console.log("data added to cart");
          return;
        }
      }
    }
    //  creating new cart
    const carts = {
      CartId: uuidv4(),
      UserId: Userid,
      Products: [],
    };
    carts["Products"].push({
      id: newProduct["Productid"],
      Quantity: newProduct["Quantity"],
    });
    allCart.push(carts);

    if (cart.getCartDataUpdate(allCart)) {
      console.log("data added to cart");
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    console.log(e.message);
  }
};
const cartinfo = {Productid: "ac9ce917-aa3d-4345-a57d-68446847e3e6",Quantity: 2,};
addto_cart("1ba9b75d-f3fb-4ebc-8ae8-105120fe7a1e","e2f49706-bd4d-4cb7-893d-ed1aab4339ad" , cartinfo);


const updatecart_quantity = async (CartID, ProductID, Quantity) => {
  try {
    const allCart = await cart.getCartdata()
    for (let oldCart of allCart) {
      if (oldCart.CartId === CartID) {
        for (var product of oldCart.Products) {
          if (product.id === ProductID) {
            product.Quantity = Quantity;
            if (await cart.getCartDataUpdate(allCart)) {
              console.log("Quantity updated succesfully");
              return;
            }
          }
        }
        throw new Error("no Product found for id:" + ProductID);
      }
    }
    throw new Error("no Cart found for id:" + CartID);
  } catch (e) {
    console.log(e.message);
  }
};
//updatecart_quantity( "fcba7412-26b2-4ba7-b88b-87e4a49a15c3", "6sdade1b-2ed2-4354-92a8-a7f193bac207", 5);

const removeproduct_fromcart = async (Cartid ,Productid) =>{
  try{
    var i = 0 
    const allCart = await cart.getCartdata()
    for(oldCart of allCart) {
      if(oldCart.CartId === Cartid){
     for(let product of oldCart.Products){
      if(product.id === Productid){ 
        oldCart.Products.splice(i,1) 
        if(cart.getCartDataUpdate(allCart)){
          console.log("removed product from cart successfully");
          return;
        }
      }  
      i += 1 
     }
     throw new Error("error occured")
      }
    }
  }catch(e){
    console.log(e.message);
  }
}
//removeproduct_fromcart("fcba7412-26b2-4ba7-b88b-87e4a49a15c3" , "6sdab-2ed2-4354-92a8-a7f193bac207")






