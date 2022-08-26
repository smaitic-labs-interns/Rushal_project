const cart = require('../database/cartdb')
const user = require ('../database/userdb')
const store = require ('../database/productdb')
const Schema = require('../models/cartModel')




const addto_cart = async (Userid, newProduct) => {
  try {
    //assuming customer already have cart created
    const user_res = await user.get_user_by_id(Userid)
    if(!user_res){
      throw new Error("no user found for id :" + Userid)
    }
    const product_res =  await store.get_product_by_id(newProduct.Productid)
    
    if(!product_res){
      throw new Error("no product found for thid id :" + newProduct.Productid)
    }
    const Cart = await cart.get_active_cart_data(Userid);
    if (Cart) {
      for (let i of Cart.Products) {
        if (newProduct.Productid === i.id) {
          i.Quantity += newProduct.Quantity;
          if (cart.update_cart_data(Cart)) {
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
      if (cart.update_cart_data(Cart)) {
        console.log("data added to cart");
        return;
      }
      throw new Error("error occur while adding data on cart")
    }

    const new_cart =  Schema.cart_schema(Userid);

    new_cart["Products"].push({
      id: newProduct["Productid"],
      Quantity: newProduct["Quantity"],
    });

    if (cart.add_to_cart(new_cart)) {
      console.log("data added to cart");
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    console.log(e.message);
  }
};
const cart_info = {Productid: "8fd3ea65-7bd4-4f26-a13d-c815c4b50933",Quantity: 3};
addto_cart("98b69436-d691-47ff-904b-d29e5501b25a" , cart_info);


const updatecart_quantity = async (userid, productid, quantity) => {
  try {
    const res = await cart.update_quantity_from_cart(userid, productid, quantity);
    if (res) {
      console.log("Quantity updated succesfully");
      return;
    }
    console.log("no Product found for id:" + productid);
  } catch (e) {
    console.log(e.message);
  }
};
// updatecart_quantity("63075bfd0529b276f4bfdeeb", "63077ae843a5fcaa31c18648", 5);

const removeproduct_fromcart = async (userid, productid) => {
  try {
    const res = await cart.remove_product_from_cart(userid, productid);
    if (res) {
      console.log("removed product from cart successfully");
      return;
    }
    console.log("no product on this id :" + productid);
  } catch (e) {
    console.log(e.message);
  }
};
// removeproduct_fromcart("630751bda681e76eb4596b95" , "6308b359341824941e94f3b9")






