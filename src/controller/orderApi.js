const order = require('../service/order')


const place_order = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const data = req.body;
        const result = await order.place_order(userid ,data.shipmentAddress , data.Payment );
        res.send(result)
    }catch(err){
        res.send(err.message)
    }
}
const update_order_quantity = async (req, res) =>{
    try{
        const orderid = req.params.orderid;
        const data = req.body;
        const result = await order.update_order_quantity(orderid, data.productid ,  data.quantity);
        res.send(result)
    }catch(err){
        res.send(err.message)
    }
}
module.exports = {place_order , update_order_quantity}