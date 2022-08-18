const cart = require('../database/cartdb')
const {getProductdata} = require ('../database/productdb')
const {v4 : uuidv4} = require('uuid')


const addto_cart = async (Userid, newProduct) => {
  try {
    //assuming customer already have cart created
    const Cart = await cart.getActiveCartdata(Userid);
    if (Cart) {
      for (let i of Cart.Products) {
        if (newProduct.Productid === i.id) {
          i.Quantity += newProduct.Quantity;
          if (cart.updateCartData(Userid, Cart)) {
            console.log("data added to cart");
            return;
          }
          throw new Error("error occur while adding data on cart ")
        }
      }
      Cart["Products"].push({
        id: newProduct["Productid"],
        Quantity: newProduct["Quantity"],
      });
      if (cart.updateCartData(Userid, Cart)) {
        console.log("data added to cart");
        return;
      }
      throw new Error("error occur while adding data on cart")
    }
    //  creating new cart
    const carts = {
      CartId: uuidv4(),
      UserId: Userid,
      Products: [],
      status: "active",
    };
    carts["Products"].push({
      id: newProduct["Productid"],
      Quantity: newProduct["Quantity"],
    });

    if (cart.addToCart(carts)) {
      console.log("data added to cart");
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    console.log(e.message);
  }
};
const cartinfo = {Productid: "2065e804-0034-44a2-b091-dcbcb92dd7ec",Quantity: 2,};
addto_cart("19005597-92e7-4067-84f0-1ebaaa9232e5" , cartinfo);


const updatecart_quantity = async (CartID, ProductID, Quantity) => {
  try {
    const res = await cart.updateQuantityFromCart(CartID, ProductID, Quantity);
    if (res) {
      console.log("Quantity updated succesfully");
      return;
    }
    console.log("no Product found for id:" + ProductID);
  } catch (e) {
    console.log(e.message);
  }
};
//updatecart_quantity("19005597-92e7-4067-84f0-1ebaaa9232e5", "bb21e162-973e-4067-bdd5-dc3f80a7beda", 2);

const removeproduct_fromcart = async (Cartid, Productid) => {
  try {
    if (await cart.removeProductFromCart(Cartid, Productid)) {
      console.log("removed product from cart successfully");
      return;
    }
    console.log("no product on this id :" + Productid);
  } catch (e) {
    console.log(e.message);
  }
};
//removeproduct_fromcart("19005597-92e7-4067-84f0-1ebaaa9232e5" , "2065e804-0034-44a2-b091-dcbcb92dd7ec")






