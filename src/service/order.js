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
      const allOrder = await Order.getOrderdata();
      let totalcost = 0;
      const cartResult = await find_cart(cart_id);
      for (product of cartResult.Products) {
        const productResult = await checkingProduct(product.id);
        if (productResult.Quantity < product.Quantity) {
          throw new Error("not sufficient product on store");
        }
        // productResult.Quantity -= product.Quantity
        if (update_Quantity(product.id, product.Quantity)) {
          totalcost += product.Quantity * productResult["price"];
        }
      }
      const order = {
        OrderId: uuidv4(),
        ...cartResult,
        totalcost,
        shipementAddress: ShipementAddress,
        payment: Payment,
        orderStatus: "Review",
      };

      allOrder.push(order);
      if (Order.updateOrderData(allOrder)) {
        console.log("order palce successfully");
        return;
      }
      throw new Error("error occured");
    } catch (err) {
      console.log(err.message);
    }
}
const address = {country: "Nepal" , city: "Ktm"}
const Pay = {type: "Paypal" , status: "Paid"}
//place_order("1ba9b75d-f3fb-4ebc-8ae8-105120fe7a1e" , address, Pay)

const updateorder_quantity = async (orderid, productid, quantity) => {
  try {
    let productData = await store.getProductById(productid)

    if(productData.length <= 0){
        throw new Error("no Product in this order")
    }
        productData = productData[0]
       
    const allOrder = await Order.getOrderdata();
    for (let i = 0; i < allOrder.length; i++) {
      if (allOrder[i].OrderId === orderid) {
        for (let product of allOrder[i].Products) {
          if (product.id === productid) {
            let tempCost = allOrder[i].totalcost - productData.price * product.Quantity;
            //console.log(tempCost);
            product.Quantity = quantity;
            allOrder[i].totalcost = tempCost +(productData.price * quantity)
            if (Order.updateOrderData(allOrder)) {
              console.log("updated successfully");
              return;
            }
          }
        }
      }
    }
    throw new Error('No Order Found For Id: ' + orderid);
  } catch (err) {
    console.log(err.message);
  }
};
updateorder_quantity( "32df6d80-e17f-4713-bb03-ef3927440136", "622afe1b-2ed2-4354-92a8-a7f193bac207", 10);

const cancel_order = async(orderid) => {
  try{
    const allOrder = await Order.getOrderdata();
    for(let order of allOrder){
      if(order.OrderId === orderid){
        order.orderStatus = "canceled"
        if (Order.updateOrderData(allOrder)) {
          console.log("order cancel successfully");
          return;
        }
      }
    }
    throw new Error ("no order found on id :"+ orderid)
  }catch(e){
    console.log(e.message);
  }
}
//cancel_order ("9f86aaad-38d1-4ad0-acf2-18359d3f8345")

const trackrefund_update = async(orderid) =>{
  try{
    const allOrder = await Order.getOrderdata();
    for(let order of allOrder){
      if(order.OrderId === orderid){
        order.payment.status = "refunded"
        if (Order.updateOrderData(allOrder)) {
          console.log(" order refunded successfully");
          return;
      }
    }
  }
  throw new Error("no order found for this id:" + orderid)
}catch(e){
  console.log(e.message);
}
}
//trackrefund_update("9f86aaad-38d1-4ad0-acf2-18359d3f8345")