const{v4: uuidv4} = require('uuid')

const cart_schema = (Userid) =>{
    return{
    CartId: uuidv4(),
    UserId: Userid,
    Products: [],
    status: "active"
    }     
 }
 module.exports = {cart_schema}