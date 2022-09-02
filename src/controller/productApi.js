const product = require('../service/product')


const add_product = async (req, res) =>{
    try{
        const data = req.body
        const result = await product.add_product(data.category , data.name , data.price , data.brand , data.Quantity)
        res.send(result)
    }catch(err){
        res.send(err.message)
    }
}

const remove_product = async (req , res) =>{
    try{
        const productid = req.params.id
        const result = await product.remove_product(productid)
        res.send(result)
    }catch(err){
        res.send(err.message)
    }
}
const update_product = async (req , res) =>{
    try{
        const productid = req.params.id
        const data = req.body
        // console.log(data.Quantity)
        const result = await product.update_product(productid, data)
        res.send(result)
    }catch(err){
        res.send(err.message)
    }
}
const search_product = async (req , res) =>{
    try{
        const keyword = req.params.keyword
        const result = await product.search_product(keyword)
        res.send(result)
    }catch(err){
        res.send(err.message)
    }
}

module.exports = {add_product , remove_product , update_product , search_product}