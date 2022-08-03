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

const addtoCart = (CartID, Userid, newProduct) => {
  try {
    //assuming customer already have cart created
    const productResult = checkingProduct(newProduct.Productid);
    for (let Acart of allCart) {
      if (Acart.CartId === CartID) {
        for (let i of Acart.Products) {
          if (newProduct.Productid === i.id) {
            i.Quantity += newProduct.Quantity;
            // Acart.Totalcost += newProduct.Quantity * productResult.price;
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


const updateCartQuantity = (CartID, ProductID, Quantity) => {
  try {
    const productResult = checkingProduct(ProductID);
  
        for (let oldCart of allCart) {
          if (oldCart.CartId === CartID) {
            for (var product of oldCart.Products) {
              if (product.id === ProductID) {
                product.Quantity = Quantity;
                // oldCart.Totalcost += Quantity * productResult["price"];
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
updateCartQuantity( "fcba7412-26b2-4ba7-b88b-87e4a49a15c3", "6sdade1b-2ed2-4354-92a8-a7f193bac207", 5);







