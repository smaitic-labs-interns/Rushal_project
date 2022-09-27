const cart = require('../database/cartdb')
const user = require ('../database/userdb')
const store = require ('../database/productdb')
const Schema = require('../models/cartModel')



const get_cart_by_id = async (id) =>{
  try {
  const carts = await cart.get_active_cart_data(id)
  if(carts){
    return carts
  }else{
    return ({
      'message': 'no product found'
    })
  }
}catch(err){
  throw err
}
}

const addto_cart = async (Userid, newProduct) => {
  try {
    //assuming customer already have cart created
    console.log(newProduct);
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
          if (await cart.update_cart_data(Cart)) {
            console.log("quantity added to cart");
            return "quantity added to cart";
          }
          throw new Error("error occur while adding data on cart ")
        }
      }
      Cart["Products"].push({
        id: newProduct["Productid"],
        Quantity: newProduct["Quantity"],
      });
      if (await cart.update_cart_data(Cart)) {
        console.log("data added to cart");
        return "data added to cart";
      }
      throw new Error("error occur while adding data on cart")
    }

    const new_cart =  Schema.cart_schema(Userid);

    new_cart["Products"].push({
      id: newProduct["Productid"],
      Quantity: newProduct["Quantity"],
    });

    if (await cart.add_to_cart(new_cart)) {
      console.log("data added to cart");
      return "data added to cart"
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    console.log(e.message);
    throw e
  }
};
const cart_info = {Productid: "30939740-d5df-4fc8-928c-5af178c0c832",Quantity: 2};
// addto_cart("98b69436-d691-47ff-904b-d29e5501b25a" , cart_info);


const updatecart_quantity = async (userid, data) => {
  try {
    const res = await cart.update_quantity_from_cart(userid, data);
    console.log(res)
    if (res) {
      console.log("Quantity updated succesfully");
      return "Quantity updated succesfully" 
    }
    throw new Error ("no Product found for id:" + productid);
  } catch (e) {
    console.log(e.message);
    throw e
  }
};
// updatecart_quantity("98b69436-d691-47ff-904b-d29e5501b25a", "30939740-d5df-4fc8-928c-5af178c0c832", 10);

const removeproduct_fromcart = async (userid, productid) => {
  try {
    const res = await cart.remove_product_from_cart(userid, productid);
    if (res) {
      console.log("removed product from cart successfully");
      return "removed product from cart successfully"
    }
    console.log("no product or user on this id :" + productid +" "+ userid);
  } catch (e) {
    console.log(e.message);
    throw e
  }
};
// removeproduct_fromcart("98b69436-d691-47ff-904b-d29e5501b25a" , "30939740-d5df-4fc8-928c-5af178c0c832")

module.exports = {addto_cart, updatecart_quantity , removeproduct_fromcart , get_cart_by_id}






