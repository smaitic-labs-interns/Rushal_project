const Order = require("../database/orderdb");
const cartDb = require("../database/cartdb.js");
const { v4: uuidv4 } = require("uuid");
const store = require("../database/productdb");
const Schema = require("../models/orderModel");
const user = require("../database/userdb");


const get_user_orders = async(userid)=>{

try {
  const userOrders = await Order.get_order_by_userid(userid)
  if(userOrders){
    return userOrders
  }
  return("no order found for userid: " + userid)
} catch (error) {
  throw error
}

}

const place_order = async (user_id, shipementAddress, Payment) => {
  try {
    const user_res = await user.get_user_by_id(user_id);
    if (!user_res) {
      throw new Error("no user found for id :" + user_id);
    }
    const PAYMENT_TYPES = ["E-sewa", "Khalti", "fone pay", "CASH"];
    if (!PAYMENT_TYPES.includes(Payment.type)) {
      throw new Error("Invalid Payment");
    }
    let totalcost = 0;
    const cartResult = await cartDb.get_active_cart_data(user_id);
    if (cartResult.status !== "active") {
      throw new Error(`Cart has been already placed for order`);
    }
    for (product of cartResult.Products) {
      const productResult = await store.checking_product(product.id);
      if (productResult.Quantity < product.Quantity) {
        throw new Error("not sufficient product on store");
      }
      if (store.update_decrease_quantity(product.id, product.Quantity)) {
        totalcost += product.Quantity * productResult["price"];
      }
    }
    const new_order = Schema.order_schema(
      cartResult,
      shipementAddress,
      Payment,
      totalcost
    );

    const placeOrder = await Order.add_order(new_order);
    if (placeOrder.acknowledged) {
      console.log(placeOrder);
      const deactivateCart = await cartDb.deactive_cart(user_id);
      if (deactivateCart) {
        console.log(deactivateCart);
        return {
          message: "Order place successfully",
          orderid: placeOrder.insertedId,
        };
      }
      throw new Error("error occur while deactivating cart");
    }
    throw new Error("error occured");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
const shipments = {
  name: "Inside Ringroad",
  charge: 150,
  status: "on the way",
};
const address = { country: "Nepal", city: "Ktm", ...shipments };
const Pay = { type: "Khalti", status: "Paid" };
// place_order("98b69436-d691-47ff-904b-d29e5501b25a" ,address,Pay)

const update_order_quantity = async (orderid, productid, quantity) => {
  try {
    let productdata = await store.get_product_by_id(productid);
    if (productdata.length <= 0) {
      throw new Error("no Product in this order");
    }
    const order = await Order.get_order_by_id(orderid);
    if (
      order.orderStatus === "delivered" ||
      order.orderStatus === "on the way"
    ) {
      throw new Error("order already placed for " + order.orderStatus);
    }

    if (order) {
      for (let product of order.Products) {
        if (product.id === productid) {
          productdata.Quantity += product.Quantity;
          let tempCost = order.totalcost - productdata.price * product.Quantity;
          product.Quantity = quantity;
          productdata.Quantity -= quantity;
          order.totalcost = tempCost + productdata.price * quantity;
          if (Order.update_order(orderid, order)) {
            if (store.update_product(productid, productdata)) {
              console.log("updated successfully");
              return "updated successfully";
            }
            throw new Error("error occur while updating in store");
          }
          throw new Error("error occur while updating");
        }
      }
    }
    throw new Error("No Order Found For Id: " + orderid);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
// update_order_quantity("fe9a365e-579c-402d-8414-eb6dd7fe5528", "30939740-d5df-4fc8-928c-5af178c0c832", 5);

async function update_shipment_status(order_id, Status) {
  try {
    const order = await Order.get_order_by_id(order_id);
    if (order.orderStatus === "canceled" || order.orderStatus === "returned") {
      throw new Error("order has already been " + order.orderStatus);
    }
    if (order) {
      order.shipementAddress.status = Status;
      switch (Status) {
        case "awaiting":
          order.orderStatus = "placed";
          break;
        case "vendor_sourcing":
          order.orderStatus = "approved";
          break;
        case "on_route":
          order.orderStatus = "on the way";
          break;
        case "delivered":
          order.orderStatus = "delivered";
          break;
        default:
          throw new Error("provide valid status");
      }
      if (await Order.update_order(order_id, order)) {
        console.log("shipment status updated");
        return "shipment status updated";
      }
      throw new Error("error updating order");
    }
    throw new Error("no order found");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
// update_shipment_status("fe9a365e-579c-402d-8414-eb6dd7fe5528" , "delivered")

const cancel_order = async (orderid) => {
  try {
    // const allOrder = await Order.getOrderdata();
    const order = await Order.get_order_by_id(orderid);
    if (order.orderStatus === "canceled") {
      throw new Error("order already been canceled");
    }
    if (order) {
      order.orderStatus = "canceled";
      order.payment.status = "canceled";
      order.shipementAddress.charge = 0;
      order.shipementAddress.status = "canceled";
      for (product of order.Products) {
        // console.log(product);
        let product_res = await store.get_product_by_id(product.id);
        product_res.Quantity += product.Quantity;
        // console.log(product_res.price);
        await store.update_product(product.id, product_res);
      }
      if (await Order.update_order(orderid, order)) {
        console.log("order cancel successfully");
        return "order cancel successfully";
      }
    }
    throw new Error("no order found on id :" + orderid);
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
// cancel_order ("630cb26f49615b4fa51eb69f")

async function return_replace_order(order_id, action) {
  try {
    const order = await Order.get_order_by_id(order_id);
    if (order.orderStatus === "returned" || order.orderStatus === "replaced") {
      throw new Error("order already placed for " + order.orderStatus);
    }
    if (order) {
      switch (action) {
        case "return":
          order.orderStatus = "returned";
          order.shipementAddress.status = "returned";
          order.payment.status = "refunded";
          for (let product of order.Products) {
            const product_res = await store.get_product_by_id(product.id);
            order.totalcost -= product_res.price * product.Quantity;
            await store.update_increase_quantity(product.id, product.Quantity);
          }
          break;
        case "replace":
          order.orderStatus = "replaced";
          order.shipementAddress.status = "replaced";
          break;
        default:
          throw new Error("provide valid action");
      }
      if (await Order.update_order(order_id, order)) {
        console.log("order " + action + " successfully");
        return "order " + action + " successfully";
      }
      throw new Error("error occur while" + action);
    }
    throw new Error("no order found");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
// return_replace_order("fe9a365e-579c-402d-8414-eb6dd7fe5528" , "return")

const trackrefund_update = async (orderid) => {
  try {
    const order = await Order.get_order_by_id(orderid);
    if (order) {
      if (order.orderStatus === "returned") {
        console.log(order.payment);
        return order.payment;
      }
      throw new Error("no return order found");
    }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
// trackrefund_update("fe9a365e-579c-402d-8414-eb6dd7fe5528");

const shipment_update = async (orderid) => {
  try {
    const order = await Order.get_order_by_id(orderid);
    if (order) {
      console.log(order.shipementAddress);
      return order.shipementAddress;
    }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
// shipment_update("fe9a365e-579c-402d-8414-eb6dd7fe5528")

const track_order = async (orderid) => {
  try {
    const order = await Order.get_order_by_id(orderid);
    if (order) {
      console.log(order);
      return order ;
    }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
//track_order("")

module.exports = {
  place_order,
  update_order_quantity,
  update_shipment_status,
  cancel_order,
  return_replace_order,
  trackrefund_update,
  shipment_update,
  track_order,
  get_user_orders
};
