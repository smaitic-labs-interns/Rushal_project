

const cart_schema = (Userid) =>{
   return{
    UserId: Userid,
    Products: [],
    status: "active"
   }     
}
module.exports = {cart_schema}