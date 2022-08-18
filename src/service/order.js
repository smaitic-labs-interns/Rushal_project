const Order = require('../database/orderdb')
const cartDb = require('../database/cartdb.js')
const{v4: uuidv4} = require('uuid')
const store = require('../database/productdb')



const place_order = async (cart_id , ShipementAddress,Shipment, Payment) => {
    try {
      let totalcost = 0;
      const cartResult = await cartDb.findCart(cart_id);
      for (product of cartResult.Products) {
        const productResult = await store.checkingProduct(product.id);
        if (productResult.Quantity < product.Quantity) {
          throw new Error("not sufficient product on store");
        }
        if (store.updateQuantity(product.id, product.Quantity)) {
          totalcost += product.Quantity * productResult["price"];
        }
      }
      const order = {
        OrderId: uuidv4(),
        ...cartResult,
        totalcost,
        shipementAddress: ShipementAddress,
        payment: Payment,
        shipment: Shipment,
        orderStatus: "Review"

      };
      if (Order.addOrder(order)) {
        console.log("order palce successfully");
        return;
      }
      throw new Error("error occured");
    } catch (err) {
      console.log(err.message);
    }
}
const shipments = {name:"Inside Ringroad" , charge: 150 , status: "on the way"}
const address = {country: "Nepal" , city: "Ktm"}
const Pay = {type: "Paypal" , status: "Paid"}
//place_order("48c91f31-07a4-4303-b4a9-79bc575adfd8" ,address, shipments, Pay)


const updateorder_quantity = async (orderid, productid, quantity) => {
  try {
    let productData = await store.getProductById(productid);
    if (productData.length <= 0) {
      throw new Error("no Product in this order");
    }
    productData = productData[0];
    const order = await Order.getOrderById(orderid)
   
      if (order) {
        for (let product of order.Products) {
          if (product.id === productid) {
            let tempCost = order.totalcost - productData.price * product.Quantity;
            product.Quantity = quantity;
            order.totalcost = tempCost +(productData.price * quantity)
            if (Order.updateOrder(orderid, order)) {
              console.log("updated successfully");
              return;
            }
            throw new Error ("error occur while updating")
          }
        }
      }
    throw new Error('No Order Found For Id: ' + orderid);
  } catch (err) {
    console.log(err.message);
  }
};
//updateorder_quantity("eee76ea9-c858-4f96-8c2b-cb084fc46daa", "2065e804-0034-44a2-b091-dcbcb92dd7ec", 4);

const cancel_order = async (orderid) => {
  try {
    // const allOrder = await Order.getOrderdata();
    const order = await Order.getOrderById(orderid)
      if (order) {
        order.orderStatus = "canceled";
        order.totalcost = 0;
        order.payment.status = "canceled"
        order.shipment.charge = 0;
        order.shipment.status = "canceled"
        if (await Order.updateOrder(orderid , order)) {
          console.log("order cancel successfully");
          return;
        }
      }
      throw new Error("no order found on id :" + orderid);
  } catch (e) {
    console.log(e.message);
  }
};
// cancel_order ("eee76ea9-c858-4f96-8c2b-cb084fc46daa")

const trackrefund_update = async (orderid) => {
  try {
     const order = await Order.getOrderById(orderid)
      if (order) {
        order.payment.status = "refunded";
        order.totalcost = 0
        if (Order.updateOrder(orderid , order)) {
          console.log("order refunded successfully");
          return;
        }
      }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
  }
};
// trackrefund_update("eee76ea9-c858-4f96-8c2b-cb084fc46daa")

const shipment_update = async (orderid) => {
  try{
    const order = await Order.getOrderById(orderid)
      if(order){
        console.log(order.shipment)
        return order.shipment
      }
    throw new Error("no order found for this id:" + orderid)
  }catch(e){
    console.log(e.message);
  }
}
shipment_update("")