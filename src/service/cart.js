const cart = require('../database/cartdb')
const allCart = cart.getCartdata()
const {getProductdata} = require ('../database/productdb')
const allProduct = getProductdata()
const {v4 : uuidv4} = require('uuid')


const checkingProduct = (productid) => {
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

const addtoCart = (CartID, newProduct) => {
  try {
    //assuming customer already have cart created
    const productResult = checkingProduct(newProduct.Productid);
    for (let Acart of allCart) {
      if (Acart.CartId === CartID) {
        for (let i of Acart.Products) {
          if (newProduct.Productid === i.id) {
            i.Quantity += newProduct.Quantity;
            Acart.Totalcost += newProduct.Quantity * productResult.price;
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
        Acart["Totalcost"] += newProduct["Quantity"] * productResult["price"];
        if (cart.getCartDataUpdate(allCart)) {
          console.log("data added to cart");
          return;
        }
      }
    }
    //  creating new cart
    const carts = { CartId: uuidv4(), Products: [], Totalcost: 0 };
    carts["Products"].push({
      id: newProduct["Productid"],
      Quantity: newProduct["Quantity"],
    });
    carts["Totalcost"] += newProduct["Quantity"] * productResult["price"];
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
const cartinfo = { Productid: "3d4c3013-eadb-40b1-ba4e-fa7026dbe9a0",Quantity: 4,};
addtoCart("6c546d9b-06ab-4a3e-b921-d5d06676616b", cartinfo);


const reduceQuantity = (CartID , ProductID , Quantity) => {
  try{
    const productResult = checkingProduct(ProductID)
    for(let oldCart of allCart){
      if(oldCart.CartId === CartID){
        for(var product of oldCart.Products){
          if(product.id === ProductID){
            product.Quantity -= Quantity
            oldCart.Totalcost -= Quantity * productResult["price"]
            if(cart.getCartDataUpdate(allCart)){
              console.log("Quantity reduce succesfully");
              return
            }
          }
        }
        throw new Error ("no Product found for id:" + ProductID)
      }
    }
  throw new Error("no Cart found for id:" + CartID)
}catch(e){
  console.log(e.message);
}
}
reduceQuantity("1efe7cff-7ba5-4e02-859d-d32f737ef436" , "3d4c3013-eadb-40b1-ba4e-fa7026dbe9a0" , 4)







