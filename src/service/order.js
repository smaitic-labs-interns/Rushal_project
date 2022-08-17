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
      console.log(order);
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
place_order("19005597-92e7-4067-84f0-1ebaaa9232e5" ,address, shipments, Pay)


const updateorder_quantity = async (orderid, productid, quantity) => {
  try {
    let productData = await store.getProductById(productid);

    if (productData.length <= 0) {
      throw new Error("no Product in this order");
    }
    productData = productData[0];

    const allOrder = await Order.getOrderdata();
    for (let i = 0; i < allOrder.length; i++) {
      if (allOrder[i].OrderId === orderid) {
        for (let product of allOrder[i].Products) {
          if (product.id === productid) {
            let tempCost = allOrder[i].totalcost - productData.price * product.Quantity;
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
//updateorder_quantity("a9131cdf-96f7-4f8f-abc8-42e9e96427f6", "2065e804-0034-44a2-b091-dcbcb92dd7ec", 4);

const cancel_order = async (orderid) => {
  try {
    const allOrder = await Order.getOrderdata();
    for (let order of allOrder) {
      if (order.OrderId === orderid) {
        order.orderStatus = "canceled";
        order.totalcost = 0;
        order.payment.status = "canceled"
        order.shipment.charge = 0;
        order.shipment.status = "canceled"
        if (Order.updateOrderData(allOrder)) {
          console.log("order cancel successfully");
          return;
        }
      }
    }
    throw new Error("no order found on id :" + orderid);
  } catch (e) {
    console.log(e.message);
  }
};
//cancel_order ("a9131cdf-96f7-4f8f-abc8-42e9e96427f6")

const trackrefund_update = async (orderid) => {
  try {
    const allOrder = await Order.getOrderdata();
    for (let order of allOrder) {
      if (order.OrderId === orderid) {
        order.payment.status = "refunded";
        order.totalcost = 0
        if (Order.updateOrderData(allOrder)) {
          console.log("order refunded successfully");
          return;
        }
      }
    }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
  }
};
// trackrefund_update("a9131cdf-96f7-4f8f-abc8-42e9e96427f6")

const shipment_update = async (orderid) => {
  try{
    const allOrder = await Order.getOrderdata();
    for(let order of allOrder){
      if(order.OrderId === orderid){
        console.log(order.shipment)
        return order.shipment
      }
    }
    throw new Error("no order found for this id:" + orderid)
  }catch(e){
    console.log(e.message);
  }
}
//shipment_update("a9131cdf-96f7-4f8f-abc8-42e9e96427f6")