const Order = require('../database/orderdb')
const cartDb = require('../database/cartdb.js')
const{v4: uuidv4} = require('uuid')
const store = require('../database/productdb')



const place_order = async (user_id, ShipementAddress, Payment) => {
  try {
    const PAYMENT_TYPES = ["E-sewa", "Khalti", "CONNECT-IPS", "CASH"];
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
      if (store.update_quantity(product.id, product.Quantity)) {
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
    if (await Order.add_order(order)) {
      if (await cartDb.deactive_cart(cartResult.CartId)) {
        console.log("order palce successfully");
        return;
      }
      throw new Error("error occur while deactivating cart");
    }
    throw new Error("error occured");
  } catch (err) {
    console.log(err.message);
  }
};
const shipments = {
  name: "Inside Ringroad",
  charge: 150,
  status: "on the way",
};
const address = { country: "Nepal", city: "Ktm", ...shipments };
const Pay = { type: "E-sewa", status: "Paid" };
// place_order("25648ad7-188c-4799-900a-1feaa619c9d9" ,address,Pay)

const update_order_quantity = async (orderid, productid, quantity) => {
  try {
    let productData = await store.get_product_by_id(productid);
    if (productData.length <= 0) {
      throw new Error("no Product in this order");
    }
    const order = await Order.get_order_by_id(orderid);

    if (order) {
      for (let product of order.Products) {
        if (product.id === productid) {
          productData.Quantity += product.Quantity;
          let tempCost = order.totalcost - productData.price * product.Quantity;
          product.Quantity = quantity;
          productData.Quantity -= quantity;
          order.totalcost = tempCost + productData.price * quantity;
          if (Order.update_order(orderid, order)) {
            if (store.update_product(productid, productData)) {
              console.log("updated successfully");
              return;
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
  }
};
// update_order_quantity("", "2065e804-0034-44a2-b091-dcbcb92dd7ec", 5);

const cancel_order = async (orderid) => {
  try {
    // const allOrder = await Order.getOrderdata();
    const order = await Order.get_order_by_id(orderid);
    if (order) {
      order.orderStatus = "canceled";
      order.payment.status = "canceled";
      order.shipment.charge = 0;
      order.shipment.status = "canceled";
      for (product of order.Products) {
        // console.log(product);
        let product_res = await store.get_product_by_id(product.id);
        product_res.Quantity += product.Quantity;
        // console.log(product_res.price);
        await store.update_product(product.id, product_res);
      }
      if (await Order.update_order(orderid, order)) {
        console.log("order cancel successfully");
        return;
      }
    }
    throw new Error("no order found on id :" + orderid);
  } catch (e) {
    console.log(e.message);
  }
};
// cancel_order ("118b91f3-0c46-48e2-80fd-6e2dc834e829")

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
        return;
      }
      throw new Error("error occur while" + action);
    }
    throw new Error("no order found");
  } catch (err) {
    console.log(err.message);
  }
}
// return_replace_order("3ac588fe-5fbf-4246-8a9e-0b9e879c743d" , "replace")

async function update_shipment_status(order_id, Status) {
  try {
    const order = await Order.get_order_by_id(order_id);
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
          order.orderStatus = "in progress";
          break;
        case "delivered":
          order.orderStatus = "delivered";
          break;
        default:
          order.orderStatus = "active";
          break;
      }
      if (await Order.update_order(order_id, order)) {
        console.log("shipment status updated");
        return;
      }
      throw new Error("error updating order");
    }
    throw new Error("no order found");
  } catch (err) {
    throw err;
  }
}
// update_shipment_status("3ac588fe-5fbf-4246-8a9e-0b9e879c743d" , "vendor_sourcing")

const trackrefund_update = async (orderid) => {
  try {
    const order = await Order.get_order_by_id(orderid);
    if (order) {
      if (order.status === "returned") {
        console.log(order.payment.status);
        return;
      }
      throw new Error("no return order found");
    }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
  }
};
// trackrefund_update("7e04f6e1-81ef-4ab8-8504-e17950ada730");

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
  }
};
shipment_update("7e04f6e1-81ef-4ab8-8504-e17950ada730")