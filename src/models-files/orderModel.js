
const {v4 : uuidv4} = require('uuid')

const order_schema = (cart,shipementAddress , Payment , totalcost) => {


    return{
            OrderId: uuidv4(),
            UserId: cart.UserId,
            Products: cart.Products,
            totalcost: totalcost,
            shipementAddress,
            payment: Payment,
            orderStatus: "Review",
    }
}
module.exports = {order_schema}