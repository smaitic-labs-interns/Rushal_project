const cart = require('../service/cart')
// const user = require('../data/users')


const get_user_cart = async (req, res) =>{
    try {
        const userid = req.params.id
        // console.log(cartid);
        const carts = await cart.get_cart_by_id(userid)
        console.log(carts);
        res.status(200).json(carts)
    } catch (error) {
        res.status(400).json({
            'message': 'somthing went wrong'
        })
    }
}


const add_cart = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const store = req.body;
        console.log(userid)
        console.log(store);
        const result = await cart.addto_cart(userid , {Productid: store.productId , Quantity : store.productQuantity});
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const update_cart_quantity = async (req, res) =>{
    try{
        const user_id = req.params.userid;
        const data = req.body;
        
        const result = await cart.updatecart_quantity(user_id,data);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}

const remove_product_from_cart = async (req, res) =>{
    try{
        const user_id = req.params.userid;
        const data = req.body;
        const result = await cart.removeproduct_fromcart(user_id , data);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}

module.exports = {add_cart , update_cart_quantity , remove_product_from_cart ,get_user_cart}