const express = require('express')
const router = express.Router()
const cart = require('../controller/cartApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

router.post("/cart/addcart/:userid", cart.add_cart)
router.put("/cart/updatecart/:userid" , cart.update_cart_quantity)
router.put("/cart/removecartproduct/:userid" ,cart.remove_product_from_cart)

module.exports = router;