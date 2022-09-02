const express = require('express')
const router = express.Router()
const order = require('../controller/orderApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

router.post("/order/placeorder/:userid" , order.place_order)
router.put("/order/updateorder/:orderid" , order.update_order_quantity)

module.exports = router