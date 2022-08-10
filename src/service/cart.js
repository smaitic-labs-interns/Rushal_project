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
const cartinfo = {Productid: "2065e804-0034-44a2-b091-dcbcb92dd7ec",Quantity: 2,};
//addto_cart("a7b084ca-b9a8-4b92-83c2-3bbb20914a97","9b385ce7-afb2-451e-9937-b219aa79355a" , cartinfo);


const updatecart_quantity = async (CartID, ProductID, Quantity) => {
  try {
    const allCart = await cart.getCartdata()
    for (let oldCart of allCart) {
      if (oldCart.CartId === CartID) {
        for (var product of oldCart.Products) {
          if (product.id === ProductID) {
            product.Quantity = Quantity;
            if (cart.getCartDataUpdate(allCart)) {
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
//updatecart_quantity("a7b084ca-b9a8-4b92-83c2-3bbb20914a97", "2065e804-0034-44a2-b091-dcbcb92dd7ec", 2);

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
// removeproduct_fromcart("cad9d7cb-ca6e-4759-b5d0-48fcc9ed3497" , "2065e804-0034-44a2-b091-dcbcb92dd7ec")






