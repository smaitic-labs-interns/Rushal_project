const order = require('../service/order')


const place_order_by_user = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const data = req.body;
        const result = await order.place_order_by_user(userid ,data.shipmentdetails );
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send(err.message);
    }
}
const get_user_orders = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const result = await order.get_user_orders(userid);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send(err.message);
    }
}


const place_order = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const data = req.body;
        const result = await order.place_order(userid ,data.shipementAddress , data.Payment );
        console.log(result);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send(err.message);
    }
}
const update_order_quantity = async (req, res) =>{
    try{
        const orderid = req.params.orderid;
        const data = req.body;
        const result = await order.update_order_quantity(orderid, data.productid , data.quantity);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const update_shipment_status = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const data = req.body;
        const result = await order.update_shipment_status(orderid, data.status);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const cancel_order = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const result = await order.cancel_order(orderid);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const return_replace_order = async(req,res) => {
    try{
        const orderid = req.params.orderid;
        const data = req.body;
        const result = await order.return_replace_order(orderid , data.action);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const track_refund_update = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const result = await order.trackrefund_update(orderid);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}

const shipment_update = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const result = await order.shipment_update(orderid);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const track_order = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const result = await order.track_order(orderid);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = {
  place_order,
  update_order_quantity,
  update_shipment_status,
  cancel_order,
  return_replace_order,
  track_refund_update,
  shipment_update,
  track_order,
  place_order_by_user,
  get_user_orders
};