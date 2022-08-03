const Order = require('../database/orderdb')
const cartDb = require('../database/cartdb.js')
const{v4: uuidv4} = require('uuid')
const allCart = cartDb.getCartdata()

const findCart = (cartId) => {
    try{
        for(cart of allCart){
            if(cart.CartId === cartId){
                return cart;
            }
        }
        throw new Error("no cart found for id :" + cartId)
    }catch(e){
        throw e
    }
}


const place_order = (cart_id , ShipementAddress, Payment)=>{
    try {
        const cartResult = findCart(cart_id) 
        const order = {OrderId : uuidv4() , ...cartResult , shipementAddress: ShipementAddress , payment: Payment, orderStatus: "Review" }

        if(Order.updateOrderData(order)){
            console.log("order palce successfully");
            return
        }
        throw new Error ("error occured")
    }catch(err){
        console.log(err.message);
    }
}
const address = {country: "Nepal" , city: "Ktm"}
const Pay = {type: "esewa" , status: "Paid"}
place_order("fcba7412-26b2-4ba7-b88b-87e4a49a15c3" , address, Pay)
