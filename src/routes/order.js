const express = require('express')
const router = express.Router()
const order = require('../controller/orderApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

router.post("/order/placeorder/:userid" , order.place_order)
router.put("/order/updateorder/:orderid" , order.update_order_quantity)
router.put("/order/shipmentstatus/:orderid" , order.update_shipment_status)
router.put("/order/cancelorder/:orderid" , order.cancel_order)
router.put("/order/returnreplaceorder/:orderid" , order.return_replace_order)
router.get("/order/trackrefund/:orderid" , order.track_refund_update)
router.get("/order/shipmentupdate/:orderid" , order.shipment_update)

module.exports = router