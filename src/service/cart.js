const cart = require('../database/cartdb')
const {getProductdata} = require ('../database/productdb')
const {v4 : uuidv4} = require('uuid')
const user = require ('../database/userdb_files')


const addto_cart = async (Userid, newProduct) => {
  try {
    //assuming customer already have cart created
    const user_res = await user.get_user_by_id(Userid)
    if(!user_res){
      throw new Error("nouser found for id :" + Userid)
    }
    const Cart = await cart.get_active_cart_data(Userid);
    if (Cart) {
      for (let i of Cart.Products) {
        if (newProduct.Productid === i.id) {
          i.Quantity += newProduct.Quantity;
          if (cart.update_cart_data(Cart.CartId, Cart)) {
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
      if (cart.update_cart_data(Cart.CartId, Cart)) {
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

    if (cart.add_to_cart(carts)) {
      console.log("data added to cart");
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    console.log(e.message);
  }
};
const cartinfo = {Productid: "2065e804-0034-44a2-b091-dcbcb92dd7ec",Quantity: 2,};
addto_cart("25648ad7-188c-4799-900a-1feaa619c9d9" , cartinfo);


const updatecart_quantity = async (CartID, ProductID, Quantity) => {
  try {
    const res = await cart.update_quantity_from_cart(CartID, ProductID, Quantity);
    if (res) {
      console.log("Quantity updated succesfully");
      return;
    }
    console.log("no Product found for id:" + ProductID);
  } catch (e) {
    console.log(e.message);
  }
};
// updatecart_quantity("34b19a33-7776-47c5-b523-545717d7d8efff", "2065e804-0034-44a2-b091-dcbcb92dd7eccc", 5);

const removeproduct_fromcart = async (Cartid, Productid) => {
  try {
    if (await cart.remove_product_from_cart(Cartid, Productid)) {
      console.log("removed product from cart successfully");
      return;
    }
    console.log("no product on this id :" + Productid);
  } catch (e) {
    console.log(e.message);
  }
};
// removeproduct_fromcart("34b19a33-7776-47c5-b523-545717d7d8ef" , "2065e804-0034-44a2-b091-dcbcb92dd7ec")






