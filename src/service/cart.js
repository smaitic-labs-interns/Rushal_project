const cart = require('../database/cartdb')
const {getProductdata} = require ('../database/productdb')
const allProduct = getProductdata()
const {v4 : uuidv4} = require('uuid')


const checkingProduct = async(productid) => {
  try {
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

const addtoCart = async (CartID, Userid, newProduct) => {
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
        // Acart["Totalcost"] += newProduct["Quantity"] * productResult["price"];
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
    // carts["Totalcost"] += newProduct["Quantity"] * productResult["price"];
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
const cartinfo = { Productid: "6sdade1b-2ed2-4354-92a8-a7f193bac207",Quantity: 4,};
//addtoCart(" ","e2f49706-bd4d-4cb7-893d-ed1aab4339ad" , cartinfo);


const updateCartQuantity = async (CartID, ProductID, Quantity) => {
  try {
    const allCart = await cart.getCartdata()
    for (let oldCart of allCart) {
      if (oldCart.CartId === CartID) {
        for (var product of oldCart.Products) {
          if (product.id === ProductID) {
            product.Quantity = Quantity;
            // oldCart.Totalcost += Quantity * productResult["price"];
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
//updateCartQuantity( "fcba7412-26b2-4ba7-b88b-87e4a49a15c3", "6sdade1b-2ed2-4354-92a8-a7f193bac207", 5);

const removeProductFromCart = async (Cartid ,Productid) =>{ //productid=3
  try{
    var i = 0 // i =0 initial condition
    const allCart = await cart.getCartdata()
    for(oldCart of allCart) {
      if(oldCart.CartId === Cartid){
     for(let product of oldCart.Products){
      if(product.id === Productid){ // produsts[{id:1, qua:2}, {id:2, q:2},{id:3, q:3}, {id:4}]
        oldCart.Products.splice(i,1) //2,1
        if(cart.getCartDataUpdate(allCart)){
          console.log("removed product from cart successfully");
          return;
        }
      }  
      i += 1 // 0/1, 1/2,
     }
     throw new Error("error occured")
      }
    }
  }catch(e){
    console.log(e.message);
  }
}
removeProductFromCart("fcba7412-26b2-4ba7-b88b-87e4a49a15c3" , "6sdab-2ed2-4354-92a8-a7f193bac207")






