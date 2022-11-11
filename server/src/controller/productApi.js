const product = require('../service/product')


const all_products = async (req,res)=>{
    try {
        const products = await product.get_all_products()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({
            'message': 'somthing went wrong'
        })
    }
}

const get_product_by_id = async (req,res) =>{
    try {
        const productid = req.params.id
        // console.log(productid);
        const products = await product.get_product_id(productid)
        console.log(products);
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({
            'message': 'somthing went wrong'
        })
    }
}
const add_product = async (req, res) =>{
    try{
        const data = req.body
        console.log(data);
        const result = await product.add_product(data.category , data.name , data.price , data.brand , data.quantity)
        res.status(200).send({data : result})
    }catch(err){
        res.status(400).send(err.message);
    }
}

const remove_product = async (req , res) =>{
    try{
        const productid = req.params.id
        const result = await product.remove_product(productid)
        res.status(200).send({data: result})
    }catch(err){
        res.status(400).send(err.message);
    }
}
const update_product = async (req , res) =>{
    try{
        const productid = req.params.id
        const data = req.body
        // console.log(data.Quantity)
        const result = await product.update_product(productid, data)
        res.status(200).send({data: result})
    }catch(err){
        res.status(400).send(err.message);
    }
}
const search_product = async (req , res) =>{
    try{
        const keyword = req.params.keyword
        console.log(keyword);
        const result = await product.search_product(keyword)
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send({data:err.message});
    }
}

module.exports = {add_product , remove_product , update_product , search_product , all_products , get_product_by_id}