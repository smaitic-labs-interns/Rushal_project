const express = require('express')
const router = express.Router()
const product = require('../controller/productApi')


router.post("/product/addproduct", product.add_product)
router.delete("/product/removeproduct/:id",product.remove_product)
router.put("/product/updateproduct/:id" ,product.update_product )
router.get("/product/searchproduct/:keyword" , product.search_product)
router.get('/product', product.all_products)
router.get('/product/:id', product.get_product_by_id)


module.exports = router;