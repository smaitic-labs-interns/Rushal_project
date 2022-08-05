const Order = require('../database/orderdb')
const cartDb = require('../database/cartdb.js')
const{v4: uuidv4} = require('uuid')
const store = require('../database/productdb')


const checkingProduct = async (productid) => {
    try {
        const allProduct = await store.getProductdata()
        // console.log(productid);
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

const find_cart = async (cartId) => {
    try{
        const allCart = await cartDb.getCartdata()
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

const update_Quantity = async (id , quantity) =>{

const allProduct = await store.getProductdata()
for(product of allProduct){
    if (product.product_id === id){
        product.Quantity -= quantity
    }

}
if(store.updateProductData(allProduct)){
    return true
}else{
    console.log("error Occured");
}
}

const place_order = async (cart_id , ShipementAddress, Payment) => {
    try {
     const allOrder = await Order.getOrderdata()
       let totalcost = 0
        const cartResult = await find_cart(cart_id) 
        for(product of cartResult.Products){
            const productResult = await checkingProduct(product.id);
            if(productResult.Quantity < product.Quantity){
                throw new Error ("not sufficient product on store")
            }
            // productResult.Quantity -= product.Quantity
            if(update_Quantity(product.id , product.Quantity)){
             totalcost += product.Quantity * productResult["price"]
            }
        }
        const order = {OrderId : uuidv4() , ...cartResult , totalcost , shipementAddress: ShipementAddress , payment: Payment, orderStatus: "Review" }

        allOrder.push(order);
        if(await Order.updateOrderData(allOrder)){
            console.log("order palce successfully");
            return
        }
        throw new Error ("error occured")
    }catch(err){
        console.log(err.message);
    }
}
const address = {country: "Nepal" , city: "Ktm"}
const Pay = {type: "esewa" , status: "Paid"}
//place_order("08198902-b3a1-4c3f-9f90-987b46176639" , address, Pay)

const UpdateOrder_Quantity = async (orderid , productid , quantity) => {
    try {
    const allOrder = await Order.getOrderdata()
        for(let i = 0 ; i < allOrder.length ; i++){
            if(allOrder[i].OrderId === orderid){           
                for(let product of allOrder[i].Products){
                    if (product.id === productid){
                        // total price -= currentQuantity*Price of that quantity // product_res()
                        product.Quantity = quantity 
                        // total price += current quantity* current price // product_res = f1();
                        if(Order.updateOrderData(allOrder)){
                            console.log("updated successfully");
                            return;
                        }
                    }
                }
            }
            
        }
        throw new Error('"No Order Found For Id: '+orderid)
    }catch(err){
        console.log(err.message);
    }
}
UpdateOrder_Quantity ("0b84fd89-bb6e-4fcc-8527-cbe7477a639b" , "6sdade1b-2ed2-4354-92a8-a7f193bac207" , 15 )